# Documentação
Aqui está a documentação com detalhes as decições tomadas na implementação do código deste APP.


## Estrutura

A primeira coisa que foi definida foi a nossa estrutura, um ponto muito importante para deixar o projeto organizado a partir do momento inicial e pronto para uma expansão.

```sh
src/
|
├── types/
│   └── index.ts
├── services/
│   └── api.ts
|── contexts/
│   └── SnackbarContext.tsx
├── hooks/
│   └── useCards.ts
│   └── usePasswordForm.ts
├── components/
│   └── CardList.tsx
│   └── DeleteDialog.tsx
│   └── EditPasswordModal.tsx
│   └── SearchBar.tsx
├── App.tsx
└── Main.tsx
```

Todas as responsabilidades foram separadas em um novo diretório deixando assim o projeto estruturado e pronto para manutenções pontuais sem colocar em risco a estrutura como um todo.

## Documentos

Abaixo você pode acessar a documentação de cada item.

* [Types](Types.MD)
* [Services](Services.MD)
* [Contexts](Contexts.MD)
* [Hooks](Hooks.MD)
* [Components](Components.MD)
* [App](App.MD)
* [Main](Main.MD)