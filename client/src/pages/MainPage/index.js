import React, { Component } from 'react'
import styles from './index.scss'
import Card from '../../components/Card'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Category from '../../components/Category'
import { Helmet } from 'react-helmet'

export default class MainPage extends Component {

  state = {
    poems: [],
    categories: []
  }

  async getPoems() {
    const req = await axios.get('/api/poems/list')
    if (req.data.success) {
      this.setState({ poems: req.data.data })
    }
  }

  async getCategories() {
    const req = await axios.get('/api/categories/list?limit=5')
    if (req.data.success) {
      this.setState({ categories: req.data.data })
    }
  }

  componentDidMount() {
    this.getPoems()
    this.getCategories()
  }

  render() {
    return (
      <div className={styles.page}>
        <Helmet>
          <title>Лаборатория стихов</title>
        </Helmet>
        <div className={styles.left_column}>
          <div className={`${styles.alert} ${styles[`alert--red`]}`}>
            <div>
              <div className={styles.alert_title}>
                У нас есть приложение!
                </div>
              <div className={styles.alert_subtitle}>
                установи наше приложение для более удобного взаимодействия с контентом по <a href="#">ссылке</a>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.section_title_block}>
              <span className={styles.section_title}>Рекомендуемые текста</span>
              {/* <NavLink to='/' className={styles.section_link}>Больше</NavLink> */}
            </div>
            <div className={styles.favourite_section_cards}>
              {
                this.state.poems.length > 0 ?
                  this.state.poems.map(r => (
                    <Card key={r._id} thumbnail={r.thumbnail} title={r.title} author={r.author} likes={r.likes} to={`/poema/${r._id}`} className={styles.card} />
                  ))
                  : <p>Стихи не найдены</p>
              }
            </div>
          </div>
        </div>
        <div className={styles.right_column}>
          <div>
            <div>
              <div className={styles.section_title_block}>
                <span className={styles.section_title}>Популярные категории</span>
                <NavLink to='/categories' className={styles.section_link}>Больше</NavLink>
              </div>
              <div>
                {
                  this.state.categories.length > 0 ?
                    this.state.categories.map(r => (<Category key={r._id} color={r.color} title={r.name} subtitle={r.description} to={`/category/${r.name}`} />))
                    : <p>Категории не найдены</p>
                }
              </div>
            </div>
            {/* <div style={{marginTop: '30px'}}>
              <div className={styles.section_title_block}>
                <span className={styles.section_title}>Популярные авторы</span>
                <NavLink to='/' className={styles.section_link}>Больше</NavLink>
              </div>
              <div>
                <p>В разработке</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}
