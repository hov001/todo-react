import React from 'react'
import './Todo.css'
// Material ui
import { Box, Button, Input, List, ListItem } from '@material-ui/core'
// Id generator
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'

class Todo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      draft: {
        value: '',
      },
      todos: [],
    }
  }

  handleChangeDraft = (e) => {
    if (e.target.value.trim() !== '')
      this.setState({ draft: { value: e.target.value } })
  }

  handleAddItem = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      this.setState(({ draft, todos }) => {
        if (draft.value !== '') {
          return {
            draft: { value: '' },
            todos: [
              { id: uuidv4(), value: draft.value, completed: false },
              ...todos,
            ],
          }
        }
      })
    }
  }

  handleCompleted = (completedId) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) =>
        todo.id === completedId ? { ...todo, completed: !todo.completed } : todo
      ),
    }))
  }

  componentWillUnmount() {
    localStorage.setItem('todos', this.state)
  }

  render() {
    const { draft, todos } = this.state
    console.log(this.state)
    return (
      <div>
        <Box color="text.primary" my="20px">
          <Input
            placeholder="Add new item"
            value={draft.value}
            onChange={this.handleChangeDraft}
            onKeyPress={this.handleAddItem}
          />
          <Button
            variant="contained"
            color="primary"
            ml="10px"
            onClick={this.handleAddItem}
          >
            Add new Item
          </Button>
        </Box>
        <Box color="info.main" width={1 / 4} my="10px" mx="auto">
          <List component="nav" aria-label="main mailbox folders">
            {todos.map(({ id, value, completed }) => (
              <ListItem
                button
                key={id}
                onDoubleClick={() => this.handleCompleted(id)}
              >
                <span className={classNames({ 'completed-item': completed })}>
                  {value}
                </span>
              </ListItem>
            ))}
          </List>
        </Box>
      </div>
    )
  }
}

export default Todo
