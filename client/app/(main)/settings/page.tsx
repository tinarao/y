import { ThemeToggle } from '@/components/theming/ThemeToggle'
import React from 'react'

const SettingsPage = () => {
  return (
    <div className='container border-x h-screen py-8'>
        <title>y . настройки</title>
        <h2 className='text-3xl'>
            Настройки
        </h2>
        <div className='py-4'>
            <hr />
        </div>
        <div>
            <h3 className='text-lg'>Внешний вид</h3>
            <ThemeToggle align="start" />
        </div>
    </div>
  )
}

export default SettingsPage