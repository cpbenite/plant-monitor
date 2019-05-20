function setActivePage(page_id) {
  // Get NavBar items
  let items = document.querySelector('navbar').children;

  // Remove active items
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove('active');
  }

  // Add active to current element
  document.getElementById(page_id).classList.add('active');
}
