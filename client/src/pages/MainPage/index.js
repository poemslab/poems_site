import React, { Component } from 'react'
import styles from './index.scss'
import Card from '../../components/Card'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Category from '../../components/Category'
import AwesomeSlider from 'react-awesome-slider'

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
        <div>
          <AwesomeSlider
            bullets={false}
            className={styles.slider}
          >
            <div className={styles.alert}>
              <div>
                <div className={styles.alert_title}>
                  А вы знали, что...
                </div>
                <div className={styles.alert_subtitle}>
                  люди, которые <span className={styles.bold}>пользуются нашим, сайтом</span> на <span className={styles.bold}>99%</span> счастливeе тех людей, которые наш <span className={styles.bold}>сайт не используют!</span>
                </div>
              </div>
            </div>
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
          </AwesomeSlider>
          <div>
            <div className={styles.section_title_block}>
              <span className={styles.section_title}>Рекомендуемые текста</span>
              {/* <NavLink to='/' className={styles.section_link}>Больше</NavLink> */}
            </div>
            <div className={styles.favourite_section_cards}>
              {
                this.state.poems.length > 0 ?
                  this.state.poems.map(r => (<Card key={r._id} thumbnail={r.thumbnail} title={r.title} author={r.author} likes={r.likes} to={`/poema/${r._id}`} className={styles.card} />))
                  : <p>Стихи не найдены</p>
              }
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <div className={styles.section_title_block}>
                <span className={styles.section_title}>Популярные категории</span>
                <NavLink to='/' className={styles.section_link}>Больше</NavLink>
              </div>
              <div>
                {
                  this.state.categories.length > 0 ?
                    this.state.categories.map(r => (<Category key={r._id} color={r.color} title={r.name} subtitle={r.description} to={`/category/${r.name}`} className={styles.card} />))
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
