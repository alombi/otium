export function toggleMobileSidebar(){
   if(screen.width < 550){
     document.getElementById('page').style.paddingLeft = 0;
     document.getElementById('sidebar').style.display = 'none'
   }
}

export function loading(direction){
   if(direction != window.location.pathname){
     document.getElementById('real-page').style.display = 'none';
     document.getElementById('waitingForBookshelfPageToBeOpened').style.display = 'flex';
   }
   toggleMobileSidebar()
}