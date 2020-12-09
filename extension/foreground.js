console.log('from foreground')

// document.querySelector('#hplogo img').classList.add('spin')

const first = document.createElement('button')
first.innerText = 'SET_DATA'
first.id = 'first'

const second = document.createElement('button')
second.innerText = 'SHOUTOUT TO BACKEND'
second.id = 'second'

document.querySelector('body').appendChild(first)
document.querySelector('body').appendChild(second)

first.addEventListener('click', () => {
  console.log('I SET DATA')
  chrome.storage.local.set({password: '123'})
})
// chrome.storage.sync will sync storage across devices if the user is logged in
// console.log("first click!")

second.addEventListener('click', () => {
  // chrome.storage.sync will sync storage across devices if the user is logged in
  console.log('first click!')
  chrome.runtime.sendMessage({message: 'CHECK THE STORAGE'})
  console.log('I SENT THE MESSAGE')
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.message)
})
