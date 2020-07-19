import React, { Component } from 'react'
import styles from './index.scss'
import axios from 'axios'
import Category from '../../components/Category'

export default class index extends Component {

  state = {
    data: []
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    const req = await axios.get('/api/categories/list')
    if(req.data.success) {
      this.setState({
        data: req.data.data
      })
    }
  }

  render() {
    return (
      <div className={styles.grid}>
        <div className={styles.left_grid}>
          {
            this.state.data.length > 0 ?
            this.state.data.map(r => (
              <Category key={r._id} color={r.color} to={`/category/${r.name}`} title={r.name} subtitle={r.description} />
            ))
            : <p>Категории не найдены..</p>
          }
        </div>
        <div className={styles.right_grid}>
          <div className={styles.stats}>
            <h5>Статистика категорий</h5>
            <hr/>
            <div>
              Кол-во категорий: <strong> { this.state.data.length } </strong>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
