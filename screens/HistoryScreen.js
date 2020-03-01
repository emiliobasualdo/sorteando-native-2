import React, {useEffect} from 'react';
import { ScrollView, StyleSheet, View, Text, Dimensions, Platform } from 'react-native';
import TextForEmptySituations from './../components/TextForEmptySituations';
import BigDrawCard from '../components/BigDrawCard';
import HeaderDivider from './../components/HeaderDivider';
import Colors from "../constants/Colors";

const date = new Date((Date.now() / 1000) - (10*60*60*24));
const draws = [
    {id: 10000, winner: "Marcos Ochoa", title: "Matera Roja", description: "Este artefacto cuenta con un palo de color azul y además cabra muy cheta. \nEstamos probando la descripción al estilo lorem ipsum", brand: "De Mates", endDate: date, images: ["https://http2.mlstatic.com/matera-de-cuero-vacuno-D_NQ_NP_12938-MLA20069893007_032014-F.jpg","https://cdn.webshopapp.com/shops/263001/files/287759514/image.jpg", "https://dafitistaticar-a.akamaihd.net/p/ay-not-dead-6921-052142-1-product.jpg"]},
    {id: 12000, winner: "Marcos Ochoa", title: "Kit de Peluquería", description: "Este artefacto cuenta con un palo de color azul y además cabra muy cheta. \nEstamos probando la descripción al estilo lorem ipsum", brand: "Peluca del pelado", endDate: date, images: ["https://mlstaticquic-a.akamaihd.net/vinilo-decorativo-de-pared-barberia-peluqueria-estilista-D_NQ_NP_607185-MLU31725182692_082019-F.jpg","https://cdn.webshopapp.com/shops/263001/files/287759514/image.jpg", "https://dafitistaticar-a.akamaihd.net/p/ay-not-dead-6921-052142-1-product.jpg"]},
    {id: 12300, winner: "Marcos Ochoa", title: "Zapatillas Nike Rn 2017", description: "Este artefacto cuenta con un palo de color azul y además cabra muy cheta. \nEstamos probando la descripción al estilo lorem ipsum", brand: "Nike", endDate: date, images: ["https://c.static-nike.com/a/images/[t_PDP_1280_v1/f_auto/a8cbfzvkkvhrfv9pr23y/air-max-270-mens-shoe-jKGdGN.jpg","https://cdn.webshopapp.com/shops/263001/files/287759514/image.jpg", "https://dafitistaticar-a.akamaihd.net/p/ay-not-dead-6921-052142-1-product.jpg"]},
    {id: 12340, winner: "Marcos Ochoa", title: "2 Noches para 2 personas", description: "Este artefacto cuenta con un palo de color azul y además cabra muy cheta. \nEstamos probando la descripción al estilo lorem ipsum", brand: "Hotel del Delta", endDate: date, images: ["https://www.ahstatic.com/photos/3167_ho_00_p_2048x1536.jpg","https://cdn.webshopapp.com/shops/263001/files/287759514/image.jpg", "https://dafitistaticar-a.akamaihd.net/p/ay-not-dead-6921-052142-1-product.jpg"]},
    {id: 12345, winner: "Marcos Ochoa", title: "Camastro King", description: "Este artefacto cuenta con un palo de color azul y además cabra muy cheta. \nEstamos probando la descripción al estilo lorem ipsum", brand: "Colchones San Isidro", endDate: date, images: ["https://http2.mlstatic.com/camastro-king-size-sillon-reposera-reclinable-mod-dubai-ext-D_NQ_NP_690117-MLA31209070041_062019-F.jpg","https://cdn.webshopapp.com/shops/263001/files/287759514/image.jpg", "https://dafitistaticar-a.akamaihd.net/p/ay-not-dead-6921-052142-1-product.jpg"]},
    {id: 12306, winner: "Marcos Ochoa", title: "Anteojos Aviator", description: "Este artefacto cuenta con un palo de color azul y además cabra muy cheta. \nEstamos probando la descripción al estilo lorem ipsum", brand: "Óptica Alemana", endDate: date, images: ["https://i.linio.com/p/3636fa68a60b8087056733df51cd7175-product.jpg","https://cdn.webshopapp.com/shops/263001/files/287759514/image.jpg", "https://dafitistaticar-a.akamaihd.net/p/ay-not-dead-6921-052142-1-product.jpg"]},
];
export default function HistoryScreen({navigation}) {
    useEffect(() => navigation.setOptions({headerTitle: header(), headerLeft:null}), []);
    return (
        <View style={styles.MainContainer}>
            <HeaderDivider style={{marginTop: 8}}/>
            <View style={styles.ScrollContainer}>
                <ScrollView style={styles.Scroll}>
                    <View>
                        {draws.length?
                            draws.map((draw, index) => <BigDrawCard key={index} draw={draw}/>)
                            :
                            <TextForEmptySituations >
                                Ups... No se pudo cargar los sorteos anteriores.{"\n"}
                                Reintentá más tarde.
                            </TextForEmptySituations>
                        }
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const header = () => <Text style={styles.HeaderText}>Ganadores pasados</Text>;

const MARGIN = 20;
const styles = StyleSheet.create({
    MainContainer: {
        flex:1,
        marginTop: MARGIN,
        flexDirection: 'column',
    },
    Header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    HeaderText: {
        alignSelf:'center',
        fontSize: 20,
    },
    ScrollContainer: {
        backgroundColor: Colors.gris,
        justifyContent: 'flex-start',
        flex: 18,
    },
    Scroll: {
        marginTop: MARGIN
    }
});
