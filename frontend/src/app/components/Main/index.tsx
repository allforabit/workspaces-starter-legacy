import React from 'react';

interface IProps {
  children: React.ReactNode;
}

export class Main extends React.Component<IProps> {
  render(): JSX.Element {
    return <div>{this.props.children}</div>;
  }
}
