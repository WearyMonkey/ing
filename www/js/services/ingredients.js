angular.module('starter').factory('ingredients', function() {
  return [
    {regex: /apple/, name: 'Apple', description: 'Apple is tasty', rating: 2},
    {regex: /preservative202/, name: 'Preservative (202)', description: 'Ummm', rating: 1},
    {regex: /regulator330/, name: 'Regulator (330)', description: 'What the hell is this?', rating: 0}
  ];
});
