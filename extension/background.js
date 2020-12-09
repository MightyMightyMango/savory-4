console.log('from background')

// // get url for user
chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, current_tab_info => {
    console.log(current_tab_info.url)
  })
})

// chrome.tabs.onupdated listener for refresh? Double check.

let active_tab_id = 0
// inject on certain page
chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, current_tab_info => {
    active_tab_id = tab.tabId
    if (/^https:\/\/www\.google/.test(current_tab_info.url)) {
      chrome.tabs.insertCSS(null, {file: './mystyles.css'})
      chrome.tabs.executeScript(null, {file: './foreground.js'}, () =>
        console.log('injected')
      )
    }
  })
})

// receive message from back end
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'CHECK THE STORAGE') {
    chrome.tabs.sendMessage(active_tab_id, {message: 'MESSAGE RECEIVED'})
    chrome.storage.local.get('password', value => {
      console.log(value)
    })
  }
})

// chrome.tabs.executeScript(null, {file: './foreground.js'}, () => console.log('injected'))
