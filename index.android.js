import React, { Component } from 'react';
import {
  TouchableHighlight,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

const VALS = {
  U: ' ',
  X: 'X',
  O: 'O',
}

export default class tictactoe extends Component {
  static defaultProps = {
    n: 3
  }

  constructor(props){
    super(props)

    let blocks = []
    for (let i=0; i<props.n; i++) {
      blocks[i] = []
      for (let j=0; j<props.n; j++) {
        blocks[i][j] = VALS.U
      }
    }

    this.state = {
      blocks: blocks,
      nextPlayerX: true,
    }
  }

  onTap(row, col) {
    let newState = this.state.blocks.slice()
    newState[row] = newState[row].slice()
    newState[row][col] = this.state.nextPlayerX ? VALS.X : VALS.O
    this.setState({
      blocks: newState,
      nextPlayerX: !this.state.nextPlayerX
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          TIC TAC TOE
        </Text>
        {this.state.blocks.map((row, rowIndex) => {
          return <View key={`row_${rowIndex}`} style={styles.row}>
            {row.map((block, colIndex) => {
              let key = `block_${rowIndex}${colIndex}`
              let blockJSX = <Text key={key} style={styles.col}>{block}</Text>
              return block !== VALS.U
                ? blockJSX
                : <TouchableHighlight key={key} onPress={this.onTap.bind(this, rowIndex, colIndex)}>
                    {blockJSX}
                  </TouchableHighlight>
            })}
          </View>
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    marginBottom: 30
  },
  row: {
    borderColor: '#000000',
    flexDirection:'row',
    flexWrap:'wrap',
  },
  col: {
    borderWidth: 1,
    fontSize: 75,
    width: 90,
    textAlign: 'center',
    height: 90,
  }
});

AppRegistry.registerComponent('tictactoe', () => tictactoe);