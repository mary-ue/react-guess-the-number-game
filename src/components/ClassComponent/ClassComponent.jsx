import React from 'react';
import PropTypes from 'prop-types';
import style from './ClassComponent.module.css';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Введите число',
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min + 1) +
        this.props.min,
      count: 0,
      isWin: false,
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    this.setState((state) => ({
      count: state.count + 1,
    }));

    this.setState((state) => {
      if (!state.userNumber) {
        return {
          result: `Введите число`,
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }

      return {
        result: `Вы угадали, загаданное число - ${state.userNumber}, 
        попыток: ${state.count}`,
        isWin: true,
      };
    });

    this.setState(() => ({
      userNumber: '',
    }));
  };

  handleChange = (evt) => {
    this.setState(
      (state, props) => ({
        userNumber: evt.target.value,
      }),
      () => {
        console.log(this.state);
      }
    );
  };

  handleWinBtn = () => {
    this.setState(() => ({
      result: 'Введите число',
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min + 1) +
        this.props.min,
      count: 0,
      isWin: false,
    }));
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor="user_number">
            Угадай число
          </label>

          <input
            className={style.input}
            type="number"
            id="user_number"
            onChange={this.handleChange}
            value={this.state.userNumber}
          />

          <button className={style.btn}>Угадать</button>

          {this.state.isWin && (
            <button className={style.btn} onClick={this.handleWinBtn}>
              Сыграть еще
            </button>
          )}
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
