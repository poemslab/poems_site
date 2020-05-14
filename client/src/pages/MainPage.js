import React from 'react'
import Block from '../components/Block'
import Button from '../components/Button'

export default function MainPage() {
  return (
    <div className='container'>
      <section className='welcome_section'>
        <Block />
        <div className='pr'>
          <div style={{ marginTop: 60 }}>
            <p className='title'>Всегда мечтал стать популярным автором?</p>
          </div>
          <div style={{ marginTop: 30 }}>
            <p className='subtitle'>Наша платформа поможет начинающим авторам приобрести себе аудиторию, развиться, а так же показать свои способности!</p>
          </div>
          <div style={{ marginTop: 50 }}>
            <Button>Попробовать бесплатно</Button>
          </div>
        </div>
      </section>
      <section style={{ marginTop: '40vh' }} className='about_section '>
        <div style={{left: -1350, top: -100}} className='block'></div>
        <div>
          <div style={{width: '700px'}}>
            <p className='title orangeGradient'>
              Poems lab - это то, что ты искал!
            </p>
            <p className='subtitle'>
              Ниже представлены только самые важные аспекты которые включает наше полностью <span className='bold'>Бесплатное</span> приложение
            </p>
          </div>
          <div style={{marginTop: 90}} className='arrow'>
            <img src={require('../assets/arrow.png')} />
          </div>
          <div className='list'>
            <div>
              <img src={require('../assets/phone.png')} />
              <p className='title purpleGradient'>Мультиплатформенность</p>
              <p className='subtitle'>Работает везде, не только на телефонах, компьютерах, а даже у Вари..</p>
            </div>
            <div>
              <img src={require('../assets/feather.png')} />
              <p className='title redGradient'>Маленький вес</p>
              <p className='subtitle'>Наше приложение весит как пушинка! Ну или как сигарета Миши! Смотря с чем сравнивать..</p>
            </div>
            <div>
              <img src={require('../assets/web.png')} />
              <p className='title blueGradient'>Безграничность</p>
              <p className='subtitle'>Делай что тебе вздумается, тебя ничего не ограничевает! <span className='bold'>Кроме списка правил!</span></p>
            </div>
            <div>
              <img src={require('../assets/shield.png')} />
              <p className='title greenGradient'>Безопасность</p>
              <p className='subtitle'>Весь контент в приложении проходит наистражайшую модерацию, так что контент 0+ точно не пройдёт!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
