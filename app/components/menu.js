import '../styles/menu.css';
import { changeTableOnCountry } from '../service/changeTable';

export default function showPopUpMenu(context) {
  const container = document.createElement('div');
  container.className = ('menu-container container-fluid p-0 justify-content-between align-items-center');

  const columnFirst = document.createElement('div');
  const columnSecond = document.createElement('div');
  const columnThird = document.createElement('div');

  columnFirst.className = 'first-column m-0 p-0 col-2 fs-6';
  columnSecond.className = 'second-column m-0 p-0 col-5 fs-6';
  columnThird.className = 'third-column m-0 p-0 col-5 fs-6';

  const all = context.optAllLastDay === 'all' ? '<span><b>All</b></span>' : '<span>All</span>';
  const day = context.optAllLastDay === 'all' ? '<span>Last day</span>' : '<span><b>Last day</b></span>';
  const total = context.optTotalPer100 === 'total' ? '<span><b>Total</b></span>' : '<span>Total</span>';
  const per100 = context.optTotalPer100 === 'total' ? '<span>per 100 k</span>' : '<span><b>per 100 k</b></span>';

  columnFirst.innerHTML = '<span>Enlarge</span>';
  columnSecond.innerHTML = `${all} | ${day}`;
  columnThird.innerHTML = `${total} | ${per100}`;

  container.appendChild(columnFirst);
  container.appendChild(columnSecond);
  container.appendChild(columnThird);

  container.addEventListener('click', (e) => {
    const value = e.target.textContent;
    if (value.toLowerCase() === 'enlarge') {
      const classname = e.target.parentNode.parentNode.parentNode.className;
      const target = (RegExp(`^([a-z]*)-container.*`).exec(classname)[1]);
      // console.log(target);
      context.enlarge = target;
      context.makeEnlarge();
      // console.log(rowcontainer);

      return;
    }
    context.changeFilterOptions()(value);
    const parentContainer = document.querySelector('.list-container');
    const newAll = context.optAllLastDay === 'all' ? '<span><b>All</b></span>' : '<span>All</span>';
    const newDay = context.optAllLastDay === 'all' ? '<span>Last day</span>' : '<span><b>Last day</b></span>';
    const newTotal = context.optTotalPer100 === 'total' ? '<span><b>Total</b></span>' : '<span>Total</span>';
    const newPer100 = context.optTotalPer100 === 'total' ? '<span>per 100 k</span>' : '<span><b>per 100 k</b></span>';
    columnSecond.innerHTML = `${newAll} | ${newDay}`;
    columnThird.innerHTML = `${newTotal} | ${newPer100}`;
    changeTableOnCountry(context, e);

    const dom = context.getTableForList(context);
    const listRow = document.querySelector('.list-row');
    const listRowChildren = document.querySelector('.list-row').children[1];
    listRowChildren.remove();
    listRow.appendChild(dom);

    return;
  });

  return container;
}