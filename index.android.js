import React, { Component } from 'react';
import {
  TouchableHighlight,
  AppRegistry,
  StyleSheet,
  Button,
  Text,
  View
} from 'react-native';

import {
  UNIT,
  init,
  updateMove,
  getBestMove,
  getWinner,
} from './tictactoe'

export default class tictactoe extends Component {
  static defaultProps = {
    n: 3
  }

  constructor(props){
    super(props)
    this.state = {
      twoPlayer: true,
      ...this.getInitialState(props)
    }
  }

  getInitialState(props){
    let blocks = []
    for (let i=0; i<props.n; i++) {
      blocks[i] = []
      for (let j=0; j<props.n; j++) {
        blocks[i][j] = UNIT.U
      }
    }

    init(blocks)

    return {
      terms: 0,
      timer: null,
      winner: null,
      blocks: blocks,
      nextPlayerX: true,
    }
  }

  newGame(playerMode) {
    clearTimeout(this.state.timer)

    this.setState({
      twoPlayer: playerMode,
      ...this.getInitialState(this.props)
    })
  }

  onTap(row, col) {
    let size = this.state.blocks.length
      , timer = null
    if (!this.state.twoPlayer && this.state.terms + 1 !== size * size) {
      timer = setTimeout(() => {
        if (this.state.winner) return

        this.selectBlock.apply(this, getBestMove(
          this.state.blocks, this.getNextUnit()
        ))
      }, 300)
    }
    this.selectBlock(row, col, timer)
  }

  getNextUnit() {
    return this.state.nextPlayerX ? UNIT.X : UNIT.O
  }

  selectBlock(row, col, timer) {
    let newState = this.state.blocks.slice()
    newState[row] = newState[row].slice()
    newState[row][col] = this.getNextUnit()

    updateMove(row, col, newState)
    this.setState({
      terms: this.state.terms + 1,
      timer: timer,
      blocks: newState,
      winner: getWinner(newState),
      nextPlayerX: !this.state.nextPlayerX
    })
  }

  getGridJSX() {
    let freezeTouch = this.state.timer || this.state.winner

    return this.state.blocks.map((row, rowIndex) => {
      return <View key={`row_${rowIndex}`} style={styles.row}>
        {row.map((block, colIndex) => {
          let key = `block_${rowIndex}${colIndex}`
          let blockJSX = <Text key={key} style={styles.col}>{block}</Text>
          return freezeTouch || block !== UNIT.U
            ? blockJSX
            : <TouchableHighlight key={key} onPress={this.onTap.bind(this, rowIndex, colIndex)}>
                {blockJSX}
              </TouchableHighlight>
        })}
      </View>
    })
  }

  render() {
    let vsButtonText = `Player vs ${this.state.twoPlayer ? 'Player' : 'Computer'}`
      , gridJSX = this.getGridJSX()
      , size = this.state.blocks.length
      , helpMessage = `It's a draw`

    helpMessage = this.state.terms === size * size
        ? this.state.winner
            ? `${this.state.winner} WON!`
            : `It's a DRAW!`
        : this.state.winner
            ? `${this.state.winner} WON!`
            : `${this.state.nextPlayerX ? UNIT.X : UNIT.O}'s chances!`

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>TIC TAC TOE</Text>
        <Text style={styles.winner}>{helpMessage}</Text>
        <View>{gridJSX}</View>
        <View style={styles.button}>
          <Button
            onPress={this.newGame.bind(this, this.state.twoPlayer)}
            title="New Game"
            accessibilityLabel="Start a fresh game"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={this.newGame.bind(this, !this.state.twoPlayer)}
            title={vsButtonText}
            accessibilityLabel="Toggle player mode"
          />
        </View>
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
    marginBottom: 30,
    color: '#272837',
  },
  winner: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
  },
  button: {
    margin: 20,
  },
});

AppRegistry.registerComponent('tictactoe', () => tictactoe);