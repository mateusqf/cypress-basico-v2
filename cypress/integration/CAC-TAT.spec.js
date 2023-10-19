/// <reference types="Cypress"/>


//O bloco describe define a suíte de testes, e o bloco it, define um caso de teste.
describe('Central de Atendimento ao Cliente TAT', function(){
     beforeEach(function() { // é uma função usada em estruturas de teste em JavaScript, para definir um bloco de código que deve ser executado antes de cada caso de teste (ou "spec") dentro de uma suíte de testes.
        cy.visit('./src/index.html') //  Essa função permite carregar uma página web em um navegador controlado pelo Cypress, sendo o ponto de partida para a execução de testes de automação de interfaces web.
        })

    it ('verifica o título da aplicacão', function(){ 
       cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
      
    })
  //atividade 1
    it('preenche os campos obrigatórios e envia o formulário', function(){
    cy.get('#firstName').type('Mateus')
    cy.get('#lastName').type('Queiroz')
    cy.get('#email').type('mateusqueirozw@gmail.com')
    cy.get('#open-text-area').type('testehjvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvhh', {delay: 0})// Esta é uma propriedade que está sendo definida com o valor 0. Ela é usada para controlar o atraso entre a digitação dos caracteres no elemento. Neste caso, você está definindo o atraso para zero, o que significa que os caracteres serão digitados o mais rapidamente possível.
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')// validar se tem um elemento CSS com success
    })
   // atividade 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
    cy.get('#firstName').type('Mateus')
    cy.get('#lastName').type('Queiroz')
    cy.get('#email').type('mateus@gmailcom')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible') // validar se tem um elemento CSS com error
   })

   // atividade 3
   it('se um valor não-numérico for digitado, seu valor continuará vazio', function(){ 
      cy.get('#phone')
      .type('mateus')
      .should('have.value', '')//A asserção .should('have.value', '') verifica se o valor do campo de entrada é uma string vazia, o que é a verificação apropriada para determinar se o campo está vazio.
   })

   //atividade 4
 it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
   cy.get('#firstName').type('Mateus')
   cy.get('#lastName').type('Queiroz')
   cy.get('#email').type('mateus@gmail.com')
   cy.get('#phone-checkbox').check() // sempre usar o check para elementos com checkbox
   cy.get('#open-text-area').type('teste')
   //cy.get('.button').click() maneira de usar com o get, trocamos para contains
   cy.contains('button', 'Enviar').click()

   cy.get('.error').should('be.visible') // validar se tem um elemento CSS com error
   })
 
   //atividade 5
   it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){

      cy.get('#firstName').type('Mateus').should('have.value', 'Mateus').clear().should('have.value', '')
      cy.get('#lastName').type('Queiroz').should('have.value', 'Queiroz').clear().should('have.value', '')
      cy.get('#email').type('mateus@gmail.com').should('have.value', 'mateus@gmail.com').clear().should('have.value', '')
      cy.get('#phone').type('88888888').should('have.value', '88888888').clear().should('have.value', '')
      
      // cy.get('#open-text-area').type('teste').should('have.value', 'teste').clear().should('have.value', '')
      // cy.get('.button').click()
      // cy.get('.success').should('be.visible') // validar se tem um elemento CSS com error
   })
   //atividade 6
   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
      cy.get('button[type="submit"]').click()
      cy.get('.error').should('be.visible') 
   })
   //atividade 7
   it('envia o formuário com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()// comando customizado, vc que escolhe o nome do comando.
      cy.get('.success').should('be.visible') 
   })

   //atividade aula 4 exercício
   it('seleciona um produto (YouTube) por seu texto', function(){
      cy.get('#product')
      .select('YouTube') //pegamos o valor de texto do dos produtos listados
      .should('have.value', 'youtube')// pegamos o valor real do elemento
   })
 
   it('seleciona um produto (Mentoria) por seu valor (value)', function(){
     cy.get('#product')
     .select('mentoria')
    .should('have.value', 'mentoria')

   //  const produto = 'mentoria'; 
   //    cy.get('#product')          segunda maneira de fazer usando uma variavel
   //   .select(produto)
   //   .should('have.value', produto)
   })
  
   it('seleciona um produto (Blog) por seu índice', function(){

      cy.get('#product')
      .select(1) //selecionando o elemento pelo indice
      .should('have.value', 'blog') // olhando se o valor desse índice é igual a blog
   })
 
   it('marca o tipo de atendimento "Feedback"',function(){
       cy.get('input[type="radio"][value="feedback"]')
       .check()
       .should('have.value','feedback')
   })
 
   it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
      .should('have.length',3)
      .each(function($radio) { // pegar cada elemento radio, o each recebe uma funcao
         // então .each recebe uma função como argumento e dentro dessa função ela recebe um agurmento que é cada um dos elementos
       cy.wrap($radio).check()
       cy.wrap($radio).should('be.checked')
      })

   })

   it('marca ambos checkboxes, depois desmarca o último', function(){
      cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last() // pega o ultimo elemento de checkbox
      .uncheck() // depois desmarcar ele 
      .should('not.be.checked') // depois verifica se ele está desmarcado  
   })

   //fazendo o upload do arquivo
   it('seleciona um arquivo da pasta fixtures', function(){
     cy.get('input[id="file-upload"]')
     .selectFile('cypress/fixtures/example.json')
     .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
     })
   })
   
it('seleciona um arquivo simulando um drag-and-drop', function(){
   cy.get('input[id="file-upload"]')
     .selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})// drag-drop é tipo o usuario iria mover o arquivo da pasta até a tela
     .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
     })
})


// renomeando o arquivo 
 it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
cy.fixture('example.json').as('sampleFile')// renomeando o arquivo
cy.get('input[id="file-upload"]') // pegando o arquivo com o get
.selectFile('@sampleFile')// colocar um @ para identificar esse o arquivo renomeado
.should(function($input){
expect($input[0].files[0].name).to.equal('example.json')// verificar o arquivo selecionado
})
  })
 it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
 cy.get('#privacy a').should('have.attr', 'target', '_blank')
 })

 it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
   cy.get('#privacy a')
   .invoke('removeAttr', 'target')// removendo o target _blank
   .click()
   cy.contains('Talking About Testing').should('be.visible')

 })

 })