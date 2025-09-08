import React from 'react'

function Banner() {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-400 text-white p-6 rounded-2xl flex items-center justify-between shadow-lg">
  <div>
    <h2 className="text-2xl font-bold">✨ Unleash Your Imagination… Create a New Adventure for Your Child!</h2>
    <p className="mt-2">Generate fun, age-appropriate stories in seconds with AI.</p>
    <button className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-lg shadow hover:bg-purple-50 transition">
      Start a New Story
    </button>
  </div>
  <img 
    width={100} height={100}
    src="/banner.png" 
    alt="Kids Story" 
    className="w-80 h-80 object-contain hidden md:block"
  />
</div>

  )
}

export default Banner