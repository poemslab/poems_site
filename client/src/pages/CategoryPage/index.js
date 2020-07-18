import React, { Component } from 'react'
import styles from './index.scss'
import Card from '../../components/Card'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class CategoryPage extends Component {

  state = {
    items: []
  }

  componentDidMount() {
    this.findCategories()
  }

  findCategories = async () => {
    const req = await axios({
      method: 'get',
      url: `/api/poems/list?category=${this.props.match.params.name}`,
      validateStatus: false
    })
    if(req.data.success) {
      this.setState({items: req.data.data})
    }
  }

  render() {
    return (
      <div>
        <div className={styles.grid}>
          <div className={styles.page}>
            {
              this.state.items.length > 0 ? 
              this.state.items.map(r => (
                <Card className={styles.margin} key={r._id} to={`/poema/${r._id}`} title={r.title} author={r.author} likes={r.likes} thumbnail={r.thumbnail} />
              )) : <p>Стихи не найдены</p>
            }
          </div>
          <div>
            stata
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(CategoryPage)