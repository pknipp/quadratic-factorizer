import React from 'react';

const Header = ({ strings, col, colsVisible }) => {
    return colsVisible < col ? null :
        <th>
            {strings[0]} <br/> {strings[1]} <br/> {strings[2]} <i>{strings[3]}</i>
        </th>
}
export default Header;
