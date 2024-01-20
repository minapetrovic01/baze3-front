# Platform

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.
Ovo je frontend aplikacije. Potrebno ga je pokrenuti u skladu sa uputstvom dole navedenim. 
Ova aplikacija predstavlja platformu za pomoc pri donosenju odluka na osnovu matematickih metoda. Kada napravite nalog opcijom sign-up, u navbar-u ca se pojaviti ikonica plus klikom na koju cete moci da kreirate odluku unosom podataka koji je opisuju. Odluka je definisana alternativama (instancama koje poredimo kako bi odabrali jednu od njih). Svaka odluka ima ono na osnovu cega se donosi, a to su kriterijumi. Potrebno je uneti kriterijume (npr. tezina, cena, ...) i tezine kojima bi ih opisali i odredili vaznost subjektivno. Nakon toga, dobicete matricu koju popunjavate ocenama. Potrebno je oceniti svaku alternativu na osnovu svakog kriterijuma. Na kraju, dobicete pie-chart sa rezultatom koji je algoritam izracunao, sa ocenom svake alternative u procentima. Potrebno je kliknuti na save kako bi se odluka sacuvala u obliku kartice koju ce ostali korisnici platvorme moci videti po tagu. U svakom trenutku zapocetu odluku mozete sacuvati uz opciju Save Draft (svaki sledeci put kada kliknete na plus u navbaru dobicete vec unesene podatke do mesta gde ste stigli sa unososm), a mozete poceti i iz pocetka klikom na discard. Svaka odluka ima 3 taga koja su obavezna. U navbaru mozete videti svoje odluke (i obrisati ih klikom na kanticu), mozete ukucati ime taga u search delu i time dobiti sve odluke koje su oznacene tim tagom (ova funkcionalnost je neophodna kako ne biste morali uvek sami da donosite odluku, vec i da imate uvid u odluke vec donesene na tu temu. Jos jedna opcija u navbaru je search history koji pamti vasu istoriju pretrage i prikazuje je, a koji moze biti obrisan u svakom trenutku. Svaka odluka ima opciju support/unsupport kako bi mogli klikom na to dugme da podrzite korisnika koji je doneo tu odluku. I za kraj, tu je deo koji prikazuje vas profil sa opcijom brisanja profila, na kome mozete videti br. supportova koji ste Vi skupili.) 


## Run

Run `npm install` to install all needed plugins.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


