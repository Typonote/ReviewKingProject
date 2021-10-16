import './TabMenuItem.scss';
import { NavLink } from 'react-router-dom';

function TabMenuItem(props) {
  const scrollToServiceSection = () => {
    window.scrollTo({
      top: document.documentElement.clientHeight,
      behavior: 'smooth',
    });
  };

  return (
    <NavLink
        className="menu-item"
        to={props.path}
        exact={props.exact ? props.exact : false}
        activeStyle={{
          color: '#2496ED',
          borderBottom: 'solid 4px #2496ED',
        }}
        onClick={scrollToServiceSection}
      >
      <div className="TabWrapper">
        {props.title}
      </div>
    </NavLink>
  );
}

export default TabMenuItem;
