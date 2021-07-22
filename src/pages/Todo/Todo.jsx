import React from 'react'
// Material ui
import { Box, Button, Input, List, ListItem } from '@material-ui/core'
// Id generator
import { v4 as uuidv4 } from 'uuid'

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
            todos: [{ id: uuidv4(), value: draft.value }, ...todos],
          }
        }
      })
    }
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
            {todos.map((item) => (
              <ListItem button key={item.id}>
                {item.value}
              </ListItem>
            ))}
          </List>
        </Box>
      </div>
    )
  }
}

export default Todo
