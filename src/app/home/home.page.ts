import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Persons: Person[];
  newPersonName: string = '';

  constructor() {
    this.Persons = [];
    let newId = Guid.newGuid();
    this.Persons.push(
      {
        Id: newId, 
        name: "Mehran", 
        logs: []
      });
  }

  AddCount(Id: Guid){
    this.Persons.forEach(_ => {
      if(_.Id == Id){
        _.logs.push(
          {
            personId: Id, 
            CreationDate: new Date()
          });
      }
    })
  }

  MinusCount(Id: Guid){
    this.Persons.forEach(_ => {
      if(_.Id == Id){
        if(_.logs.length >= 0){
          _.logs.pop()
        }
      }
    })
  }

  AddPerson(){
    if(this.newPersonName != ''){
      let id = Guid.newGuid();
      this.Persons.push(
        {
          Id: id, 
          name: this.newPersonName, 
          logs: []
        });
        this.newPersonName = '';
        return;
    }
    alert('Please Enter The New Name..')
  }

  RemovePerson(Person: Person){
    this.Persons.forEach((p, index) => {
      if(p == Person){
        delete this.Persons[index];
      }
    });
    this.Persons = this.Persons.filter(function (e) {return e != null;});
  }

  ResetPersonCount(person: Person){
    this.Persons.forEach(_ => {
      if(_ == person){
        _.logs = [];
      }
    })
  }

}

interface Person{
  Id: Guid
  name: string;
  logs: log[];
}

interface log{
  personId: Guid;
  CreationDate: Date;
}

class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}