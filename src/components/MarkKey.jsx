import React from 'react'

const MarkKey = () => {
  return (
    <div className="flex flex-col w-40">
          <div className="flex flex-row justify-end items-center gap-x-2">
            <div>
              {'>'}80%
            </div>
            <div class="w-4 h-4 bg-[#63b5f4]"></div>
          </div>
          <div className="flex flex-row justify-end items-center gap-x-2">
            <div>
              60-80%
            </div>
            <div class="w-4 h-4 bg-[#7ec883]"></div>
          </div><div className="flex flex-row justify-end items-center gap-x-2">
            <div>
              40-60%
            </div>
            <div class="w-4 h-4 bg-[#ffb101]"></div>
          </div>
          <div className="flex flex-row justify-end items-center gap-x-2">
            <div>
            {'<'}40%
            </div>
            <div class="w-4 h-4 bg-[#f44236]"></div>
          </div>
        </div>
  )
}

export default MarkKey