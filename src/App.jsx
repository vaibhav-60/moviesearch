import React, { useState } from 'react'
import Search from './components/Search'

function App() {
  const [searchTerm, setSearchTerm] = useState('i am batwoman')
  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src='hero-img.png'></img>
          <h1>find <span className='text-gradient'>Movie</span> which you like to watch</h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
    </main>
  )
}

export default App
