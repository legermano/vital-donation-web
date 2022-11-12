<script setup lang="ts">
import { CollapsibleCard } from ".";
</script>

<template>
  <section id="faq-section" class="hero has-background-danger-light">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-2 has-text-centered">FAQ</h1>
        <div class="title is-3">Quais são os requisitos para doar?</div>
        <CollapsibleCard title="Requesitos" :active="true">
          <template #component>
            <div class="content is-normal">
              <ul>
                <li>
                  <div class="content is-normal">
                    <h5>Ter boas condições de saúde e estar descansado.</h5>
                    <ul>
                      <li>
                        Ter dormido pelo menos 6 horas nas últimas 24 horas.
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div class="content is-normal">
                    <h5>Pesar no mínimo 50kg.</h5>
                  </div>
                </li>
                <li>
                  <div class="content is-normal">
                    <h5>Estar com a idade entre os 16 e 60 anos.</h5>
                    <ul>
                      <li>
                        Caso já tenha doado alguma vez até os 60 anos, pode
                        continuar até os 69 anos de idade.
                      </li>
                      <li>
                        Para menores de 18 anos,
                        <a
                          href="https://drive.google.com/file/d/1WTB5PVRhKn9Fd0nCT3a1-LV8EPwmmV9O/view?usp=share_link"
                          target="_blank"
                        >
                          clique aqui
                        </a>
                        para ver quais os documentos obrigatórios e para poder
                        imprimir o formulário de autorização (que deverá ser
                        assinado no local da doação, pelo responsável legal, que
                        acompanhará o menor).
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div class="content is-normal">
                    <h5>Estar bem alimentado.</h5>
                    <ul>
                      <li>
                        Evitar alimentação gordurosa nas 4 horas que antecedem a
                        doação.
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div class="content is-normal">
                    <h5>
                      Apresentar documento de identificação original, com foto e
                      emitido por órgão oficial.
                    </h5>
                    <ul>
                      <li>
                        Pode ser: Carteira de Identidade (RG), Carteira de
                        Motorista (CNH), Cartão de Identidade de Profissional
                        Liberal ou Carteira de Trabalho e Previdência Social.
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div class="content is-normal">
                    <h5>
                      Apresentar documento de identificação original, com foto e
                      emitido por órgão oficial.
                    </h5>
                    <ul>
                      <li>
                        Pode ser: Carteira de Identidade (RG), Carteira de
                        Motorista (CNH), Cartão de Identidade de Profissional
                        Liberal ou Carteira de Trabalho e Previdência Social.
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div class="content is-normal">
                    <h5>Respeitar os intervalos para doação.</h5>
                    <ul>
                      <li>
                        Homens = 60 dias (máximo de 4 doações nos últimos 12
                        meses). Esse período deve ser ampliado para 112 dias, se
                        ocorreu doação dupla de hemácias por aférese.
                      </li>
                      <li>
                        Mulheres = 90 dias (máximo de 3 doações nos últimos 12
                        meses). Esse período deve ser ampliado para 168 dias se
                        ocorreu doação dupla de hemácias por aférese.
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </template>
        </CollapsibleCard>
        <div class="subtitle is-6 mt-3 has-text-bold">
          <strong>
            Obs.: caso não cumpra com algum dos requisitos acima, a doação NÃO
            poderá ser realizada.
          </strong>
        </div>

        <div class="content is-normal">
          <h1>Quem não pode doar?</h1>
          <p>
            Na lista abaixo estão os alguns dos principais motivos que podem
            impedir temporariamente ou definitivamente a doação de sangue. É
            importante esclarecer que esta lista não possui todos os motivos que
            podem impedir a doação. Quaisquer outras informações prestadas por
            você durante a triagem clínica, também serão consideradas para
            definir se você está apto ou não para doar sangue naquele momento.
          </p>
          <div class="subtitle is-6 mt-3 has-text-bold">
            <strong>
              Obs.: o uso de alguns medicamentos também impede a doação
              temporária ou definitivamente. Informe a enfermeira que fará sua
              triagem clínica, sobre medicamentos que esteja tomando, exames,
              cirurgias e tratamentos médicos que tenha realizado ou que estão
              em andamento.
            </strong>
          </div>
        </div>
        <CollapsibleCard
          title="Motivos que impedem temporária ou definitivamente a doação:"
          :active="true"
        >
          <template #component>
            <div class="content is-normal">
              <ul>
                <li>
                  Anemia no teste realizado imediatamente antes da doação
                  (triagem clínica).
                </li>
                <li>
                  Hipertensão ou hipotensão arterial no momento da doação.
                </li>
                <li>
                  Aumento ou diminuição dos batimentos cardíacos no momento da
                  doação.
                </li>
                <li>
                  Febre no dia ou momentos antes da doação (triagem clínica).
                </li>
                <li>Ser gestante (grávida).</li>
                <li>
                  Estar em período de amamentação (quando o parto tenha ocorrido
                  há menos de 12 meses).
                </li>
              </ul>
            </div>
          </template>
        </CollapsibleCard>
        <div class="subtitle is-6 mt-3 has-text-bold">
          <strong>
            Obs.: caso não cumpra com algum dos requisitos acima, a doação NÃO
            poderá ser realizada.
          </strong>
        </div>
        <CollapsibleCard title="Estará inapto por 48 horas:" :active="true">
          <template #component>
            <div class="content is-normal">
              <ul>
                <li>
                  Se “tomou” vacina preparada com vírus ou bactéria mortos,
                  toxóides ou recombinantes. Exemplo de doenças: cólera,
                  poliomielite (salk), difteria, tétano, febre tifóide
                  (injetável), meningite, coqueluche e pneumococo.
                </li>
              </ul>
            </div>
          </template>
        </CollapsibleCard>
        <CollapsibleCard title="Estará inapto por 7 dias:" :active="true">
          <template #component>
            <div class="content is-normal">
              <ul>
                <li>Em caso de diarréia.</li>
                <li>Após acabarem os sintomas de resfriado ou gripe.</li>
                <li>Após a cura de conjuntivite.</li>
                <li>
                  Implante dentário, extração de dente ou tratamento de canal
                  (em caso de uso de medicação, informar a enfermeira na triagem
                  clínica).
                </li>
              </ul>
            </div>
          </template>
        </CollapsibleCard>
        <CollapsibleCard title="Estará inapto por 2 semanas:" :active="true">
          <template #component>
            <div class="content is-normal">
              <ul>
                <li>
                  Depois de terminar o tratamento de infecções bacterianas.
                </li>
                <li>Depois da cura da rubéola.</li>
                <li>Depois da cura da erisipela.</li>
              </ul>
            </div>
          </template>
        </CollapsibleCard>
        <CollapsibleCard title="Estará inapto por 3 semanas:" :active="true">
          <template #component>
            <div class="content is-normal">
              <ul>
                <li>Depois da cura da caxumba.</li>
                <li>Depois da cura da catapora (varicela).</li>
              </ul>
            </div>
          </template>
        </CollapsibleCard>
        <CollapsibleCard title="Estará inapto por 4 semanas:" :active="true">
          <template #component>
            <div class="content is-normal">
              <ul>
                <li>
                  Caso tenha “tomado” vacina de vírus ou bactérias vivos e
                  atenuados. Ex.: poliomielite oral (sabin), febre tifóide oral,
                  caxumba, febre amarela, sarampo, bcg, rubéola, catapora,
                  varíola, H1N1 (com influenza) ou hepatite B.
                </li>
                <li>Caso tenha recebido soro antitetânico.</li>
                <li>Após a cura da dengue.</li>
                <li>Após cirurgia odontológica com anestesia geral.</li>
              </ul>
            </div>
          </template>
        </CollapsibleCard>
        <CollapsibleCard
          title="Estará inapto por 12 semanas (somente para mulheres):"
          :active="true"
        >
          <template #component>
            <div class="content is-normal">
              <ul>
                <li>Após parto normal ou abortamento.</li>
              </ul>
            </div>
          </template>
        </CollapsibleCard>
        <CollapsibleCard
          title="Estará inapto por 3 meses (homem ou mulher):"
          :active="true"
        >
          <template #component>
            <div class="content is-normal">
              <div class="pl-2 pt-2">Caso tenha sido submetido a:</div>
              <ul>
                <li>Apendicectomia.</li>
                <li>Hemorroidectomia.</li>
                <li>Hernioplastia.</li>
                <li>Ressecção das varizes ou a amigdalectomia.</li>
              </ul>
            </div>
          </template>
        </CollapsibleCard>
        <CollapsibleCard title="Estará inapto por 6 meses:" :active="true">
          <template #component>
            <div class="content is-normal">
              <ul>
                <li>
                  Caso tenha sido submetido a cirurgia de grande porte, como por
                  exemplo: colecistectomia, histerectomia, tireoidectomia,
                  colectomia, esplenectomia pós trauma, nefrectomia, dentre
                  outras.
                </li>
                <li>
                  Depois da cura de toxoplasmose comprovada laboratorialmente.
                </li>
                <li>
                  Depois de qualquer exame endoscópico (endoscopia digestiva
                  alta, colonoscopia, rinoscopia, dentre outros). Se com
                  biópsia, é necessário avaliação do resultado da mesma. Em caso
                  de cirurgia plástica.
                </li>
              </ul>
            </div>
          </template>
        </CollapsibleCard>
        <CollapsibleCard title="Estará inapto por 12 meses:" :active="true">
          <template #component>
            <div class="content is-normal">
              <ul>
                <li>
                  Caso tenha recebido transfusão de sangue, plasma, plaquetas ou
                  hemoderivados.
                </li>
                <li>Em caso de enxerto de pele ou de osso.</li>
                <li>
                  Em caso de acidente onde veio a se contaminar com sangue de
                  outra pessoa.
                </li>
                <li>
                  Em caso de acidente com agulha já utilizada por outra pessoa.
                </li>
                <li>
                  Caso houve contato sexual com alguma pessoa que esteja com
                  aids ou com teste positivo para hiv.
                </li>
                <li>
                  Em caso de contato com “garota de programa” ou com outra
                  pessoa que recebeu ou pagou com dinheiro ou droga por ato
                  sexual.
                </li>
                <li>
                  Em caso de contato sexual com usuário de droga endovenosa
                  (administrada diretamente na veia).
                </li>
                <li>
                  Em caso de contato sexual com pessoa que tenha recebido
                  transfusão de sangue nos últimos 12 meses.
                </li>
                <li>
                  Caso tenha relação sexual com pessoa que está com hepatite.
                </li>
                <li>Caso tenha inserido piercing.</li>
                <ul>
                  <li>
                    Se feito em local sem condições de avaliar a antissepsia:
                    aguardar 12 meses após realização;
                  </li>
                  <li>
                    Se feito com material/ferramentas descartáveis e feito em
                    local apropriado: aguardar 6 meses após realização;
                  </li>
                  <li>
                    Se feito na mucosa oral ou genital: inapto enquanto estiver
                    com o piercing, e apto após 12 meses da retirada.
                  </li>
                </ul>
                <li>Caso tenha possuído sífilis ou gonorréia.</li>
                <li>
                  Caso tenha sido detido pela Segurança Pública por mais de 24
                  horas.
                </li>
                <li>Caso seja usuário de crack, cocaína e/ou anabolizantes.</li>
              </ul>
            </div>
          </template>
        </CollapsibleCard>
        <CollapsibleCard title="Estará inapto por 5 anos:" :active="true">
          <template #component>
            <div class="content is-normal">
              <ul>
                <li>Após a cura da tuberculose pulmonar.</li>
              </ul>
            </div>
          </template>
        </CollapsibleCard>
        <CollapsibleCard
          title="Nunca poderá ser doador de sangue se:"
          :active="true"
        >
          <template #component>
            <div class="content is-normal">
              <ul>
                <li>Recebeu enxerto de duramater.</li>
                <li>Teve ou tem teste positivo para hiv.</li>
                <li>Teve hepatite após os 10 anos de idade.</li>
                <li>Teve malária.</li>
                <li>Teve doença de chagas.</li>
                <li>Teve algum tipo de câncer, incluindo leucemia.</li>
                <li>Teve problema de coagulação de sangue.</li>
                <li>Teve tuberculose extra-pulmonar.</li>
                <li>Teve elefantíase.</li>
                <li>Teve brucelose.</li>
                <li>Teve hanseníase (lepra).</li>
                <li>Teve calazar (leishmaniose visceral).</li>
                <li>Foi submetido a gastrectomia total.</li>
                <li>Foi submetido a pneumectomia.</li>
                <li>Foi submetido a esplenectomia não decorrente de trauma.</li>
                <li>Foi submetido a transplante de órgãos ou de medula.</li>
                <li>Foi usuário de drogas injetáveis.</li>
                <li>
                  Tem diabetes com complicações vasculares, ou ser insulino
                  dependente.
                </li>
                <li>
                  Tem alguma doença que gere inimputabilidade jurídica (quando o
                  sujeito não é capaz de entender que o fato é ilícito e de agir
                  conforme esse entendimento).
                </li>
              </ul>
            </div>
          </template>
        </CollapsibleCard>
        <div class="content">
          <blockquote
            class="title is-4 has-text-centered is-italic has-background-white"
          >
            <strong>
              "Vidas também podem ser salvas através da honestidade.<br />Faça o
              certo na entrevista e seja sincero mesmo quando ninguém estiver
              olhando"
            </strong>
          </blockquote>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@import "bulma/sass/utilities/initial-variables.sass";
.card {
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  .card-content {
    padding: 0 1.5rem !important;

    .content {
      margin-bottom: 1em;
    }
  }
}
</style>
