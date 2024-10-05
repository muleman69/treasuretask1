import React from "react"
import { Backpack, Coffee, Shirt, Shoe, Sunrise, Tooth, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Task = {
  icon: React.ReactNode
  label: string
  color: string
}

const tasks: Task[] = [
  { icon: <Tooth className="w-16 h-16" />, label: "Teeth", color: "text-blue-500" },
  { icon: <Coffee className="w-16 h-16" />, label: "Breakfast", color: "text-orange-500" },
  { icon: <Shoe className="w-16 h-16" />, label: "Shoes", color: "text-green-500" },
  { icon: <Shirt className="w-16 h-16" />, label: "Clothes", color: "text-purple-500" },
  { icon: <Sunrise className="w-16 h-16" />, label: "Hair", color: "text-yellow-500" },
  { icon: <Backpack className="w-16 h-16" />, label: "Backpack", color: "text-red-500" },
]

const Header: React.FC = () => (
  <header className="flex justify-between items-center mb-4 z-10">
    <h1 className="text-3xl font-bold text-purple-700">Thursday, Sep 26</h1>
    <div className="bg-yellow-400 text-purple-700 px-4 py-2 rounded-full text-2xl font-bold shadow-md">
      50 coins
    </div>
  </header>
)

const TaskList: React.FC = () => (
  <div className="grid grid-cols-2 gap-4">
    {tasks.map((task, index) => (
      <Card key={index} className="cursor-move transition-all hover:scale-105 hover:shadow-xl border-4 border-dashed border-purple-300">
        <CardContent className="flex flex-col items-center justify-center p-4">
          <div className={`${task.color}`}>{task.icon}</div>
          <span className="mt-2 text-xl font-semibold text-gray-700">{task.label}</span>
        </CardContent>
      </Card>
    ))}
  </div>
)

const TreasureChest: React.FC = () => (
  <div className="w-80 h-80 bg-yellow-800 rounded-t-[40px] rounded-b-xl relative overflow-hidden border-8 border-yellow-900">
    <div className="absolute inset-x-6 top-6 bottom-20 bg-yellow-600 rounded-t-3xl"></div>
    <div className="absolute inset-x-20 top-20 h-12 bg-yellow-500 rounded-full"></div>
    <div className="absolute inset-x-0 bottom-0 h-20 bg-yellow-900 rounded-b-xl"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-4xl font-bold text-yellow-100">Treasure Chest</span>
    </div>
  </div>
)

const CompletedTasks: React.FC = () => (
  <Card className="mt-4">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-purple-700">Completed Tasks</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center space-x-4 bg-gray-100 rounded-lg p-2 border-2 border-dashed border-purple-300">
        <Tooth className="w-12 h-12 text-blue-500" />
        <span className="text-xl font-semibold text-gray-700">Teeth</span>
        <ChevronRight className="w-8 h-8 text-green-500" />
      </div>
    </CardContent>
  </Card>
)

const DecorativeElements: React.FC = () => (
  <>
    <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-300 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-300 rounded-full translate-x-1/2 translate-y-1/2"></div>
    <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-green-300 rounded-full"></div>
    <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-blue-300 rounded-full"></div>
    <div className="absolute top-3/4 right-1/3 w-12 h-12 bg-red-300 rounded-full"></div>
    <div className="absolute bottom-2/3 left-1/3 w-24 h-24 bg-orange-300 rounded-full"></div>
  </>
)

export default function TaskApp() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-200 to-purple-200 p-4 font-sans relative overflow-hidden">
      <DecorativeElements />
      <Header />
      <main className="flex-1 flex flex-col z-10">
        <div className="flex-1 flex">
          <div className="w-1/2 pr-4">
            <TaskList />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center relative">
            <TreasureChest />
          </div>
        </div>
        <CompletedTasks />
      </main>
      <footer className="mt-4 z-10">
        <Button
          className="w-full bg-green-500 hover:bg-green-600 text-white text-4xl font-bold py-8 rounded-xl shadow-lg transform transition-transform hover:scale-105 border-4 border-green-600"
          size="lg"
        >
          FINISHED!
        </Button>
        <p className="text-center text-lg text-purple-700 mt-2 font-semibold">
          Click this button when all tasks are in the treasure chest!
        </p>
      </footer>
    </div>
  )
}