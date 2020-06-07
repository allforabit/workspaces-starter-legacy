import React from 'react';

export class Navbar extends React.Component {
  render(): JSX.Element {
    return (
      <div>
        <header>
          <nav>
            <ul>
              <li>
                <a href="https://blackfall-labs.com">Blackfall Labs</a>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}
