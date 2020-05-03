import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Meat } from '../models/meat';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class MeatService {
	meatCollection: AngularFirestoreCollection<Meat>;

	constructor(private afs: AngularFirestore) {
		this.meatCollection = afs.collection<Meat>('meats', (ref) => ref.orderBy('name', 'desc'));
  }
  
  getAllMeat(): Observable<Meat[]> {
    return this.meatCollection.snapshotChanges().pipe(
      map(meats => meats.map(meat => {
          const data = meat.payload.doc.data();
          const id = meat.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }
}
