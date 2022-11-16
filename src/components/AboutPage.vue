<template>
  <section id="about-page-section">
    <img class="card" src="@/assets/blood-transfution.jpg" alt="" />

    <div class="content paragraph">
      <h1>Por que doar?</h1>
      <p class="paragraph-indent">
        <span>
          Um gesto solidário, a doação de sangue se refere ao ato de doar do
          próprio sangue para salvar a vida de até quatro pessoas que precisam
          passar por tratamentos e/ou intervenções médicas de maior porte e
          complexidade, como por exemplo, transplantes, transfusões, cirurgias
          diversas, procedimentos oncológicos, pacientes com doenças crônicas
          graves, como Talassemia e Doença Falciforme ou aqueles feridos em
          situações de emergência ou calamidade pública. Sabendo disso, é
          importante frisar que a doação é a única forma atual de obter os
          hemocomponentes necessários que permitem à realização desses
          tratamentos, para que sejam curados ou mesmo possam viver por mais
          tempo com qualidade de vida.
        </span>
        <br />
        <span>
          A doação de sangue é rápida e não causa dor. Tanto quanto solidário, a
          doação também é um gesto de amor e pode resultar em muitos sorrisos,
          independe da proximidade familiar entre o doador e quem receberá a
          doação.
        </span>
        <br />
        <span>
          O sangue é insubstituível e não podemos viver sem ele, por isso, se
          faz necessária a conscientização de todos, para que a doação de sangue
          espontânea se torne um hábito regular na vida das pessoas, com
          objetivo de manter os estoques de sangue sempre abastecidos e não
          apenas em datas específicas ou quando alguma pessoa conhecida
          precisar.
        </span>
        <br />
        <span>
          Agora que você entende a importância deste ato de solidariedade, faça
          a sua parte. Vá ao hemocentro mais próximo e doe sangue regularmente.
          Vidas dependem de você!
        </span>
      </p>
    </div>

    <img class="card" src="@/assets/blood-donation-registration.png" alt="" />

    <div class="content paragraph">
      <h1>Etapas da doação</h1>
      <ol>
        <li>Cadastro (ou registro) do doador.</li>
        <li>
          Triagem clínica (entrevista com enfermeiro sobre situação de saúde).
          <ol type="a">
            <li>
              Triagem hematológica para avaliar hematócrito (se tem anemia ou
              não), verificação de pressão arterial, batimentos cardíacos, peso
              e temperatura.
            </li>
          </ol>
        </li>
        <li>
          Antes da doação, caso tenha omitido alguma informação relevante na
          triagem e entenda que seu sangue doado pode oferecer risco ao
          receptor, marque “Sim” na declaração da auto-exclusão. Dessa forma seu
          sangue será sigilosamente descartado, não oferecendo riscos.
        </li>
        <li>
          Lavar as dobras dos braços e realizar a doação com suporte de
          enfermeira(o) ou técnica(o).
        </li>
        <li>Lanche pós- doação.</li>
      </ol>
    </div>

    <img class="card" src="@/assets/blood-bag-heart.jpg" alt="" />

    <div class="content paragraph how-schedule">
      <h1>Como agendar a doação</h1>
      <p class="paragraph-indent">
        <span>
          Para facilitar o fluxo das doações e melhor organizar o ambiente de
          cada hemocentro, através dos telefones disponíveis na página de cada
          hemocentro, busque entrar em contato para realizar seu agendamento.
        </span>
        <br />
        <span>Agende um horário para realizar sua doação!</span>
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "bulma/sass/utilities/mixins.sass";

section#about-page-section {
  display: grid;
  padding: 2rem;
  grid-template-columns: 300px 1fr;
  gap: 1rem;
  align-items: center;
  margin: 0 auto;
  font: 500 100%/1.5 system-ui;

  @include touch {
    display: block;
    font-size: 80%;
  }
}

img {
  width: auto;
  height: 300px;
}

p.paragraph-indent > span {
  margin-left: 2em;
}

@include touch {
  div.paragraph {
    position: relative;
    margin: -15rem 0 2rem 1rem;
    padding: 1rem;
    background: rgba(white, 0.8);
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%),
      0 0px 0 1px rgb(10 10 10 / 2%);

    &.how-schedule {
      margin: -8rem 0 2rem 1rem;
    }
  }
}
</style>
