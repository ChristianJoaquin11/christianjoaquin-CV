let currentPage = 1;
const itemsPerPage = 6;
let filteredItems = [];

// Get active filter (only one at a time)
function getActiveFilter() {
  const active = document.querySelector('.portfolio-filters .filter-active');
  return active ? active.getAttribute('data-filter') : "*";
}

function filterItems() {
  const filterClass = getActiveFilter();
  const allItems = Array.from(document.querySelectorAll('.portfolio-item'));

  filteredItems = (filterClass === "*")
    ? allItems
    : allItems.filter(item => item.classList.contains(filterClass.slice(1)));

  currentPage = 1;
  showPage(currentPage);
}

function showPage(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const itemsToShow = filteredItems.slice(start, end);

  document.querySelectorAll('.portfolio-item').forEach(item => item.style.display = 'none');
  itemsToShow.forEach(item => item.style.display = 'block');

  renderPaginationNumbers();
}

function goToPage(page) {
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  showPage(currentPage);
}

function renderPaginationNumbers() {
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const container = document.getElementById('pagination-numbers');
  container.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.classList.add('pagination-button');
    btn.textContent = i;
    if (i === currentPage) btn.style.backgroundColor = '#0e79b2';
    btn.addEventListener('click', () => goToPage(i));
    container.appendChild(btn);
  }

  document.getElementById('prev-page').style.display = currentPage === 1 ? 'none' : 'inline-block';
  document.getElementById('next-page').style.display = currentPage === totalPages ? 'none' : 'inline-block';
}

// Filter click handler (single selection)
document.querySelectorAll('.portfolio-filters li').forEach(item => {
  item.addEventListener('click', function () {
    document.querySelectorAll('.portfolio-filters li').forEach(li => li.classList.remove('filter-active'));
    this.classList.add('filter-active');
    filterItems();
  });
});

// Initial load
filterItems();
renderPaginationNumbers();

