import axios from 'axios';
import { Injectable } from '@angular/core';
import { Menu } from '../app/data/menu';
import { Users } from '../app/data/Users';
import { UsersInfos } from '../app/data/UsersInfos';
import { Commande, boisson, embalage, livraison } from '../app/data/cmd';
import { DataService } from './data.service';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class requeToUser {
    private apiUrl = environment.apiUrl;

    constructor(public data: DataService) { }

    /**
     * Ajoute ou met à jour un utilisateur via le Backend.
     */
    async addUserToFirestore(userToAdd: Users, uid: string): Promise<void> {
        try {
            const userJson: any = await this.convertUserToJson(userToAdd);
            // On utilise PUT /user/:id pour sauvegarder (Set avec merge côté backend)
            await axios.put(`${this.apiUrl}/user/${uid}`, { user: userJson }, {
                headers: { 'ngrok-skip-browser-warning': 'true' }
            });
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur via API:", error);
            throw error;
        }
    }

    /**
     * Récupère un utilisateur via le Backend.
     */
    async getUsersFromFirestore(uid: string): Promise<Users | null> {
        try {
            const response = await axios.get(`${this.apiUrl}/user/${uid}`, {
                headers: { 'ngrok-skip-browser-warning': 'true' }
            });
            const data = response.data.data;
            if (data && data['user']) {
                return this.convertJsonToUser(data['user']);
            }
            return null;
        } catch (error) {
            console.error('Erreur lors de la récupération par API:', error);
            return null; // On retourne null si pas trouvé (404)
        }
    }

    /**
     * Alias pour getUsersFromFirestore
     */
    async getUserById(uid: string): Promise<Users | null> {
        return this.getUsersFromFirestore(uid);
    }

    /**
     * Recherche un utilisateur par email via le Backend.
     */
    async getUserByEmail(email: string): Promise<Users | null> {
        try {
            const response = await axios.get(`${this.apiUrl}/user/email/${email}`, {
                headers: { 'ngrok-skip-browser-warning': 'true' }
            });
            const data = response.data.data;
            if (data && data['user']) {
                return this.convertJsonToUser(data['user']);
            }
            return null;
        } catch (error) {
            console.error('Erreur lors de la recherche par email via API:', error);
            return null;
        }
    }

    /**
     * Recherche un utilisateur par numéro de téléphone via le Backend.
     */
    async getUserByPhone(phone: number): Promise<Users | null> {
        try {
            const response = await axios.get(`${this.apiUrl}/user/phone/${phone}`, {
                headers: { 'ngrok-skip-browser-warning': 'true' }
            });
            const data = response.data.data;
            if (data && data['user']) {
                return this.convertJsonToUser(data['user']);
            }
            return null;
        } catch (error) {
            console.error('Erreur lors de la recherche par téléphone via API:', error);
            return null;
        }
    }

    async convertUserToJson(user: Users): Promise<any> {
        const userConvert = {
            infos: {
                nom: user.infos.nom,
                prenom: user.infos.prenom,
                age: user.infos.age,
                numero: user.infos.numero,
                uid: user.infos.uid,
                email: user.infos.email,
                password: user.infos.password,
            },
            isMarchand: user.isMarchand,
            statistique: user.statistique,
            commande: (user.cmd || []).map(item => ({
                uidUser: item.uidUser,
                idCmd: item.idCmd,
                idFastFood: item.idFastFood,
                menu: {
                    titre: item.menu.titre,
                    prix1: item.menu.prix1,
                    prix2: item.menu.prix2,
                    prix3: item.menu.prix3,
                    optionPrix1: item.menu.optionPrix1,
                    optionPrix2: item.menu.optionPrix2,
                    optionPrix3: item.menu.optionPrix3,
                    image: item.menu.image,
                    disponibilite: item.menu.disponibilite,
                },
                quantite: item.quantite,
                embalage: (item.embalage || []).map(e => ({ type: e.type, prix: e.prix })),
                boisson: { type: item.boisson.type, prix: item.boisson.prix },
                livraison: { statut: item.livraison.statut, prix: item.livraison.prix },
                prixTotal: item.prixTotal,
                staut: item.staut,
                isBuy: item.isBuy,
                ispending: item.ispending,
            })),
        };
        return userConvert;
    }

    async convertJsonToUser(userJson: any): Promise<Users> {
        const infos = new UsersInfos(
            userJson.infos.nom,
            userJson.infos.prenom,
            userJson.infos.age,
            userJson.infos.numero,
            userJson.infos.uid,
            userJson.infos.email,
            userJson.infos.password
        );

        const commande: Commande[] = (userJson.commande || []).map(
            (item: any) =>
                new Commande(
                    item.uidUser,
                    item.idCmd,
                    item.idFastFood,
                    new Menu(
                        item.menu.titre,
                        item.menu.prix1,
                        item.menu.prix2,
                        item.menu.prix3,
                        item.menu.optionPrix1,
                        item.menu.optionPrix2,
                        item.menu.optionPrix3,
                        item.menu.image,
                        item.menu.disponibilite
                    ),
                    item.quantite,
                    (item.embalage || []).map((e: any) => new embalage(e.type, e.prix)),
                    new boisson(item.boisson.type, item.boisson.prix),
                    new livraison(item.livraison.statut, item.livraison.prix),
                    item.prixTotal,
                    item.staut,
                    item.isBuy,
                    item.ispending
                )
        );

        return new Users(infos, userJson.isMarchand, userJson.statistique, commande);
    }

    /**
     * Met à jour un utilisateur (Compatibilité ascendante)
     * On ignore 'idx' car on utilise désormais l'UID présent dans l'objet user.
     */
    async updateUser(userToUpdate: Users, idx: any = null): Promise<Users> {
        const uid = userToUpdate.infos.uid;
        if (!uid) throw new Error("UID manquant pour la mise à jour de l'utilisateur");

        await this.addUserToFirestore(userToUpdate, uid);
        return userToUpdate;
    }

    // Fonctions de compatibilité temporaire si nécessaire pour éviter les plantages immédiats
    async connectUserWithEmailAndUid(idx: any, mail: string, uid: string): Promise<any> {
        return this.getUsersFromFirestore(uid);
    }

    async connectUserWithNumAndUid(idx: any, num: number, uid: string): Promise<any> {
        return this.getUsersFromFirestore(uid);
    }
}
