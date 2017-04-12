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
      blocks: blocks
    }
  }

  onTap(row, col) {
    let newState = [...this.state.blocks]
    newState[row] = [...newState[row]]
    newState[row][col] = VALS.X
    this.setState({
      block: newState
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
              return <TouchableHighlight onPress={this.onTap.bind(this, rowIndex, colIndex)}>
                <Text key={`block_${rowIndex}${colIndex}`} style={styles.col}>{block}</Text>
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
    fontSize: 40,
    padding: 25,
    paddingLeft: 30,
    paddingRight: 30,
  }
});

AppRegistry.registerComponent('tictactoe', () => tictactoe);