export function hoverInTable() {
  const tables = document.querySelectorAll('.subscriptions__simple-table');

  tables.forEach(table => {
    let activeRowHeader = null;
    let activeColHeader = null;

    table.addEventListener('mouseover', e => {
      const cell = e.target.closest('td');
      if (!cell || !table.contains(cell)) return;

      const row = cell.parentElement;
      const cellIndex = cell.cellIndex;

      // 🔹 очищаємо попередні активні
      if (activeRowHeader) activeRowHeader.classList.remove('is-active');
      if (activeColHeader) activeColHeader.classList.remove('is-active');

      // 🔹 новий row header
      const rowHeader = row.querySelector('th');
      if (rowHeader) {
        rowHeader.classList.add('is-active');
        activeRowHeader = rowHeader;
      }

      // 🔹 новий col header
      const colHeader = table.querySelector(
        `thead th:nth-child(${cellIndex + 1})`
      );
      if (colHeader) {
        colHeader.classList.add('is-active');
        activeColHeader = colHeader;
      }
    });

    table.addEventListener('mouseleave', () => {
      if (activeRowHeader) activeRowHeader.classList.remove('is-active');
      if (activeColHeader) activeColHeader.classList.remove('is-active');

      activeRowHeader = null;
      activeColHeader = null;
    });
  });
}
