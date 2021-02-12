import React from 'react';

const Header = ({ strings, col, colsVisible, rowsVisible }) => {
    return colsVisible < col && rowsVisible === 1 ? null :
        <th>
            {strings[0]} <br/> {strings[1]} <br/> {strings[2]} <i>{strings[3]}</i>
        </th>
}
export default Header;
