import React, { Component } from 'react'
import styles from './index.scss'
import { connect } from 'react-redux'
import axios from 'axios'
import Input from '../../components/Input'
import Category from '../../components/Category'
import Button from '../../components/Button'
import Select from 'react-select'

export class CreateCategoryPage extends Component {

  state = {
    title: '',
    lyrics: '',
    author: '',
    category: null,
    message: null,
    color: null,
    thumbnail: '',
    categories: [],
    categoryName: 'Имя категории',
    categoryDescription: 'Описание категории',
    categoryColor: '',
    categoryIcon: ''
  }

  componentDidMount() {
    this.getCategories()
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  selectHandle = e => {
    this.setState({
      category: e.value
    })
  }

  async getCategories() {
    const req = await axios.get('/api/categories/list')
    if(req.data.success) {
      return this.setState({
        categories: req.data.data
      })
    }
  }

  createCategory = async () => {
    const token = localStorage.getItem('token')
    const req = await axios({
      method: 'put',
      url: '/api/categories/create',
      data: {
        name: this.state.categoryName,
        description: this.state.categoryDescription,
        color: this.state.categoryColor
      },
      headers: {
        authorization: `Bearer ${token}`
      },
      validateStatus: false
    })
    if (!req.data.success) {
      return this.setState({ message: req.data.message, color: 'danger' })
    }
    this.setState({ title: '', lyrics: '', category: null, author: '', message: req.data.message, color: 'success' })
  }

  createPoema = async () => {
    const regexp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    const token = localStorage.getItem('token')
    const req = await axios({
      method: 'put',
      url: '/api/poems/create',
      data: {
        title: this.state.title,
        text: this.state.lyrics,
        author: this.state.author,
        category: this.state.category,
        thumbnail: regexp.test(this.state.thumbnail) ? this.state.thumbnail : null
      },
      headers: {
        authorization: `Bearer ${token}`
      },
      validateStatus: false
    })
    if (!req.data.success) {
      return this.setState({ message: req.data.message, color: 'danger' })
    }
    this.setState({ title: '', lyrics: '', category: null, thumbnail: '', author: '', message: req.data.message, color: 'success' })
  }

  render() {
    return (
      <div className={styles.grid}>
        <div className={styles.block}>
          {
            this.state.message ? 
            <div style={{backgroundColor: this.state.color === 'danger' ? '#F25C5C' : '#27AE60'}} className={styles.alert}>
              { this.state.message }
            </div> : null
          }
          <h4>Добавить стих</h4>
          <Input onChange={this.handleChange} value={this.state.title} id='title' name='title' type='text' placeholder='Заголовок стиха' />
          <Input onChange={this.handleChange} value={this.state.title} id='author' name='author' type='text' placeholder='Автор стиха' />
          <div className={`input-field ${styles.input_field}`}>
            <textarea onChange={this.handleChange} name='lyrics' id="lyrics" className="materialize-textarea"></textarea>
            <label htmlFor="lyrics">Текст стиха</label>
          </div>
          <Input onChange={this.handleChange} value={this.state.thumbnail} id='thumbnail' name='thumbnail' type='text' placeholder='Ссылка на обложку' />
          <Select
            className='basic-single'
            name='category'
            placeholder='Выбрать'
            options={
              this.state.categories.length > 0 ?
              this.state.categories.map(r => ({ label: r.name, value: r.name }))
              : null
            } 
            onChange={this.selectHandle}
            />
          <label htmlFor='category'>Выберите категорию</label>
          <div className={styles.mt}>
            <Button type='dark' onClick={this.createPoema}>
              Добавить стих
            </Button>
          </div>
          {
            this.props.user && this.props.user.mod ?
            <div>
              <h4 className={styles.mt}>Добавить категорию</h4>
              <Input onChange={this.handleChange} id='categoryName' name='categoryName' type='text' placeholder='Имя категории' />
              <Input onChange={this.handleChange} id='categoryDescription' name='categoryDescription' type='text' placeholder='Описание категории' />
              <Input onChange={this.handleChange} id='categoryColor' name='categoryColor' type='text' placeholder='Цвет категории' />
              <Button type='dark' onClick={this.createCategory}>
                Создать категорию
              </Button>
              <h3 className={styles.mt}>Пример категории</h3>
              <Category title={this.state.categoryName} subtitle={this.state.categoryDescription} color={this.state.categoryColor} />
            </div> : null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user
})

export default connect(mapStateToProps, null)(CreateCategoryPage)