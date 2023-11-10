import styles from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <>
    <main>
      <section>
        <hgroup>
          <h1>Cadastre-se!</h1>
          <p>Faça parte das discussões!</p>
        </hgroup>
      </section>
      <section>
        <form className={styles.signForm}>
          <label htmlFor="username">Nome de usuário:</label>
          <input type="text" id='username' />
          <label htmlFor="email">Email:</label>
          <input type="email" id='email' />
          <label htmlFor="name">Nome completo:</label>
          <input type="text" id='name' />
          <label htmlFor="birthDate">Data de nascimento:</label>
          <input type="date" id='birthDate' />
          <label htmlFor="country">País:</label>
          <select name="country" id="countr">
            <option value="Brasil">Brasil</option>
          </select>
          <label htmlFor="state">Estado:</label>
          <select name="state" id="state">
            <option value="SP">SP</option>
          </select>
          <button type='reset'>Limpar</button>
          <button type='submit'>Enviar</button>
        </form>
      </section>
    </main>
    </>
  )
}

export default LoginPage