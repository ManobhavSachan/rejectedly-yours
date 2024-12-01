'use client'

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { fetchEntries, Entry } from '@/utils/api'
import { Card, CardContent } from '@/components/ui/card'
import { useAppContext } from './context/ctx'

const columns = [
  'Applied',
  'In Progress',
  'Interview',
  'Rejected',
  'Job Offer',
  'Accepted',
  'No Reply'
]

export default function Home() {
  const { jobs, loading, updateJobStatus } = useAppContext();
  const [entries, setEntries] = useState<{ [key: string]: Entry[] }>({})

  useEffect(() => {
    const grouped = jobs.reduce((acc, entry) => {
      const status = entry.status.charAt(0).toUpperCase() + entry.status.slice(1)
        if (!acc[status]) {
          acc[status] = []
        }
        acc[status].push(entry)
        return acc
      }, {} as { [key: string]: Entry[] })
    setEntries(grouped)
  }, [loading])

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result
    const sourceColumn = source.droppableId
    const destColumn = destination.droppableId

    if (sourceColumn === destColumn) {
      const newColumn = Array.from(entries[sourceColumn])
      const [reorderedItem] = newColumn.splice(source.index, 1)
      newColumn.splice(destination.index, 0, reorderedItem)
      setEntries({
        ...entries,
        [sourceColumn]: newColumn
      })
    } else {
      const sourceItems = Array.from(entries[sourceColumn])
      const destItems = Array.from(entries[destColumn] || [])
      const [movedItem] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, movedItem)
      
      updateJobStatus(movedItem.id, destColumn)

      setEntries({
        ...entries,
        [sourceColumn]: sourceItems,
        [destColumn]: destItems
      })
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Application Board</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 overflow-x-auto pb-6">
          {columns.map((columnId) => (
            <div key={columnId} className="w-80 flex-shrink-0">
              <h3 className="font-semibold mb-3 text-gray-700">{columnId}</h3>
              <Droppable droppableId={columnId}>
                {(provided: any, snapshot: any) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`bg-gray-50 p-3 rounded-lg min-h-[200px] transition-colors duration-200 ${
                      snapshot.isDraggingOver ? 'bg-indigo-50' : ''
                    }`}
                  >
                    {(entries[columnId] || []).map((entry, index) => (
                      <Draggable key={entry.id} draggableId={entry.id} index={index}>
                        {(provided: any, snapshot: any) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-2 transition-shadow duration-200 ${
                              snapshot.isDragging ? 'shadow-lg' : ''
                            }`}
                          >
                            <Card className="bg-white">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-gray-800">{entry.title}</h4>
                                <p className="text-sm text-gray-600">{entry.company}</p>
                                <p className="text-xs text-gray-500 mt-1">Date: {entry.date}</p>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

