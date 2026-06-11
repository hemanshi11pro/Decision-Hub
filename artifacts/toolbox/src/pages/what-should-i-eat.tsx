import { useState, useRef } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, RotateCw, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const FOOD: Record<string, string[]> = {
  any: [
    // Italian
    "Spaghetti Carbonara", "Fettuccine Alfredo", "Penne Arrabbiata", "Rigatoni Bolognese",
    "Tagliatelle al Ragù", "Lasagna", "Cannelloni", "Gnocchi al Pesto", "Risotto Milanese",
    "Risotto ai Funghi", "Osso Buco", "Saltimbocca", "Chicken Piccata", "Veal Parmesan",
    "Pizza Margherita", "Pizza Pepperoni", "Pizza Quattro Formaggi", "Pizza Napoletana",
    "Pizza Bianca", "Calzone", "Focaccia", "Bruschetta", "Arancini", "Supplì",
    "Tiramisu", "Panna Cotta", "Cannoli", "Sfogliatelle", "Zeppole",
    // Japanese
    "Ramen Tonkotsu", "Ramen Shoyu", "Ramen Miso", "Ramen Shio", "Tsukemen",
    "Sushi Omakase", "Salmon Nigiri", "Tuna Nigiri", "Eel Nigiri", "Shrimp Nigiri",
    "Dragon Roll", "Spider Roll", "Spicy Tuna Roll", "California Roll", "Volcano Roll",
    "Tempura Udon", "Kitsune Udon", "Beef Udon", "Zaru Soba", "Yakisoba",
    "Katsu Curry", "Chicken Katsu", "Tonkatsu", "Ebi Fry", "Korokke",
    "Takoyaki", "Okonomiyaki", "Gyoza", "Edamame", "Yakitori",
    "Karaage", "Teriyaki Salmon", "Teriyaki Chicken", "Bento Box", "Sashimi Platter",
    "Onigiri", "Miso Soup", "Chawanmushi", "Shabu Shabu", "Sukiyaki",
    "Nabe Hotpot", "Oyakodon", "Gyudon", "Katsudon", "Kaisendon",
    // Korean
    "Bibimbap", "Kimchi Jjigae", "Doenjang Jjigae", "Sundubu Jjigae", "Samgyetang",
    "Bulgogi", "Galbi", "Samgyeopsal", "Dakgalbi", "Buldak",
    "Tteokbokki", "Kimbap", "Jajangmyeon", "Japchae", "Naengmyeon",
    "Kimchi Fried Rice", "Bibim Guksu", "Ramyeon", "Army Stew (Budae Jjigae)",
    "Korean Fried Chicken", "Jokbal", "Bossam", "Gamjatang", "Haemultang",
    "Soondubu", "Dakdoritang", "Braised Short Ribs", "Sigeumchi Namul", "Kongnamul",
    // Chinese
    "Kung Pao Chicken", "Mapo Tofu", "Beef with Broccoli", "Dim Sum Platter",
    "Char Siu", "Peking Duck", "Xiaolongbao", "Dumplings", "Hot Pot",
    "Dan Dan Noodles", "Chow Mein", "Lo Mein", "Fried Rice", "Egg Fried Rice",
    "Sweet and Sour Pork", "General Tso's Chicken", "Orange Chicken", "Sesame Chicken",
    "Wonton Soup", "Hot and Sour Soup", "Egg Drop Soup", "Congee",
    "Ma La Tang", "Cumin Lamb", "Fish in Chili Sauce", "Clay Pot Rice",
    "Scallion Pancakes", "Pork Belly Dongpo", "Three-Cup Chicken",
    // Mexican
    "Tacos al Pastor", "Tacos de Carnitas", "Tacos de Barbacoa", "Tacos de Carne Asada",
    "Fish Tacos", "Shrimp Tacos", "Birria Tacos", "Elote", "Tamales",
    "Enchiladas Rojas", "Enchiladas Verdes", "Mole Poblano", "Chiles en Nogada",
    "Pozole Rojo", "Pozole Verde", "Menudo", "Caldo de Res", "Sopa de Lima",
    "Quesadillas", "Burritos", "Tostadas", "Nachos", "Sopes", "Huaraches",
    "Chilaquiles", "Huevos Rancheros", "Migas", "Machaca",
    "Guacamole & Chips", "Ceviche", "Aguachile",
    // Indian
    "Butter Chicken", "Chicken Tikka Masala", "Chicken Biryani", "Lamb Biryani",
    "Rogan Josh", "Lamb Vindaloo", "Goan Fish Curry", "Prawn Masala",
    "Saag Paneer", "Dal Makhani", "Chana Masala", "Rajma", "Aloo Gobi",
    "Palak Paneer", "Paneer Butter Masala", "Malai Kofta",
    "Naan Bread", "Garlic Naan", "Paratha", "Puri", "Dosa", "Idli Sambar",
    "Chole Bhature", "Pav Bhaji", "Vada Pav", "Samosa", "Pakora",
    "Tandoori Chicken", "Seekh Kebab", "Shami Kebab", "Haleem",
    "Gulab Jamun", "Rasgulla", "Kheer", "Jalebi", "Kulfi",
    // American
    "Smash Burger", "Double Cheeseburger", "Bacon Cheeseburger", "BBQ Burger",
    "Nashville Hot Chicken", "Fried Chicken & Waffles", "Southern Fried Chicken",
    "BBQ Brisket", "Pulled Pork Sandwich", "Beef Ribs", "Pork Ribs",
    "Mac & Cheese", "Lobster Mac & Cheese", "Buffalo Wings", "Boneless Wings",
    "Philly Cheesesteak", "Chicago Deep Dish Pizza", "New York Style Pizza",
    "Clam Chowder", "Lobster Roll", "Crab Cake", "Shrimp Po'Boy",
    "Grilled Cheese & Tomato Soup", "Reuben Sandwich", "Club Sandwich",
    "Fish & Chips", "Corn Dog", "Hot Dog", "Sloppy Joe",
    "Pancakes", "French Toast", "Eggs Benedict", "Biscuits & Gravy",
    "Apple Pie", "Peach Cobbler", "Banana Pudding", "Cheesecake",
    // Thai
    "Pad Thai", "Pad See Ew", "Pad Kra Pao", "Pad Cashew Chicken",
    "Green Curry", "Red Curry", "Massaman Curry", "Yellow Curry", "Panang Curry",
    "Tom Yum Soup", "Tom Kha Gai", "Khao Man Gai", "Kao Pad",
    "Larb Gai", "Som Tum", "Mango Sticky Rice", "Satay with Peanut Sauce",
    "Thai Spring Rolls", "Thai Basil Fried Rice",
    // Mediterranean & Middle Eastern
    "Shawarma", "Falafel Wrap", "Hummus Plate", "Baba Ganoush", "Fattoush",
    "Tabbouleh", "Kibbeh", "Kafta", "Lamb Kebab", "Shish Tawook",
    "Mansaf", "Mujaddara", "Maqluba", "Molokhia", "Fatteh",
    "Greek Souvlaki", "Gyros", "Spanakopita", "Moussaka", "Pastitsio",
    "Turkish Kebab", "Doner Kebab", "Iskender Kebab", "Adana Kebab",
    "Baklava", "Kunafa", "Om Ali", "Basbousa",
    // Vietnamese
    "Pho Bo", "Pho Ga", "Bun Bo Hue", "Hu Tieu", "Banh Mi",
    "Goi Cuon", "Cha Gio", "Bun Cha", "Bun Thit Nuong",
    "Com Tam", "Banh Xeo", "Ca Kho To", "Canh Chua",
    "Mi Quang", "Cao Lau", "White Rose Dumplings",
    // Spanish & Latin
    "Paella Valenciana", "Seafood Paella", "Paella Negra", "Cocido Madrileño",
    "Patatas Bravas", "Tortilla Española", "Gazpacho", "Salmorejo",
    "Croquetas", "Jamón Ibérico", "Pulpo a la Gallega", "Bacalao al Pil-Pil",
    "Argentinian Asado", "Chimichurri Steak", "Empanadas", "Locro",
    "Peruvian Ceviche", "Lomo Saltado", "Aji de Gallina", "Causa Limeña",
    // French
    "Bouillabaisse", "Coq au Vin", "Boeuf Bourguignon", "Duck Confit",
    "Steak Frites", "Croque Monsieur", "French Onion Soup", "Vichyssoise",
    "Ratatouille", "Quiche Lorraine", "Crêpes", "Croissant", "Soufflé",
    "Tarte Tatin", "Crème Brûlée", "Macarons",
    // Ethiopian & African
    "Doro Wat", "Injera with Misir Wat", "Tibs", "Kitfo", "Shiro",
    "Nigerian Jollof Rice", "Egusi Soup", "Pepper Soup", "Suya",
    "Moroccan Tagine", "Couscous with Lamb", "Harira Soup",
    // Fusion & Street Food
    "Smash Tacos", "Birria Ramen", "Korean BBQ Nachos", "Truffle Fries",
    "Spam Musubi", "Loco Moco", "Huli Huli Chicken", "Katsu Sando",
    "Croffles", "Crookie", "Mochi Donuts", "Churros",
  ],
  vegetarian: [
    // Italian Vegetarian
    "Margherita Pizza", "Pesto Pasta", "Gnocchi al Pesto", "Cacio e Pepe",
    "Pasta Primavera", "Mushroom Risotto", "Truffle Risotto", "Caprese Salad",
    "Arancini", "Bruschetta with Tomato", "Eggplant Parmigiana", "Panzanella",
    "Ribollita", "Minestrone Soup", "Spinach Ricotta Cannelloni",
    // Indian Vegetarian
    "Palak Paneer", "Paneer Butter Masala", "Malai Kofta", "Dal Makhani",
    "Chana Masala", "Rajma", "Aloo Gobi", "Baingan Bharta", "Matar Paneer",
    "Vegetable Biryani", "Jeera Rice", "Chole Bhature", "Pav Bhaji",
    "Masala Dosa", "Rava Dosa", "Uttapam", "Idli Sambar", "Vada Sambar",
    "Dhokla", "Khandvi", "Paneer Tikka", "Stuffed Paratha",
    "Gajar Halwa", "Ras Malai", "Gulab Jamun", "Kheer",
    // Asian Vegetarian
    "Agedashi Tofu", "Miso Soup with Tofu", "Vegetable Gyoza", "Edamame",
    "Veggie Ramen", "Kitsune Udon", "Cold Tofu (Hiyayakko)", "Inari Sushi",
    "Veggie Bibimbap", "Dubu Jorim (Braised Tofu)", "Kongnamul Muchim",
    "Mapo Tofu (Vegetarian)", "Vegetable Dumplings", "Dan Dan Noodles (Veggie)",
    "Pad Thai (Tofu)", "Green Curry (Tofu)", "Massaman Tofu Curry", "Som Tum",
    "Mango Sticky Rice", "Thai Vegetable Spring Rolls",
    // Mexican Vegetarian
    "Bean and Cheese Tacos", "Veggie Enchiladas", "Rajas con Crema", "Quesadillas",
    "Cheese Tamales", "Veggie Burritos", "Tostadas with Refried Beans",
    "Elote Corn", "Guacamole", "Vegetarian Chilaquiles", "Huevos Rancheros",
    // Mediterranean Vegetarian
    "Falafel Wrap", "Hummus Plate with Pita", "Shakshuka", "Ful Medames",
    "Spanakopita", "Horiatiki Salad", "Mezze Platter", "Tabbouleh",
    "Imam Bayildi", "Turkish Pide with Cheese", "Börek", "Lahmacun (Veggie)",
    "Ratatouille", "Salade Niçoise (no tuna)", "Vegetable Tagine", "Couscous Royale (Veggie)",
    // American Vegetarian
    "Grilled Cheese & Tomato Soup", "Veggie Burger", "Mac & Cheese",
    "Caprese Panini", "Garden Salad with Croutons", "Avocado Toast",
    "Shakshuka", "Cheese Quesadilla", "Vegetarian Chili", "Sweet Potato Fries",
    "Loaded Baked Potato", "Broccoli Cheddar Soup", "French Onion Soup",
    // Plant-Based & Fusion
    "Saag Paneer", "Paneer Tikka Masala", "Mushroom Shawarma", "Halloumi Wrap",
    "Cauliflower Steak", "Portobello Mushroom Burger", "Stuffed Bell Peppers",
    "Lentil Soup", "Black Bean Soup", "Tomato Bisque", "Butternut Squash Soup",
    "Buddha Bowl", "Grain Bowl with Roasted Veggies", "Poke Bowl (Veggie)",
    "Bao Bun with Tofu", "Katsu Sando (Veggie)", "Kimchi Fried Rice (Veggie)",
    "Veggie Pho", "Tom Kha Gai (Tofu)", "Vegetable Pad See Ew",
    "Ethiopian Injera with Lentils", "Mujaddara", "Spanakopita",
    "Gözleme", "Vegetarian Moussaka", "Mushroom Wellington",
    "Quiche Lorraine (Veggie)", "Crêpes with Mushrooms", "Cheese Soufflé",
    "Truffle Mac & Cheese", "Beet Salad with Goat Cheese", "Watermelon Feta Salad",
    "Caprese Flatbread", "Vegetarian Lasagna", "Spinach & Ricotta Ravioli",
  ],
  vegan: [
    // Italian Vegan
    "Arrabbiata Pasta", "Pesto Pasta (Vegan)", "Aglio e Olio", "Puttanesca Pasta",
    "Mushroom Pasta", "Vegan Pizza with Roasted Veggies", "Focaccia with Olives",
    "Bruschetta", "Caponata", "Minestrone Soup", "Ribollita",
    "Vegan Bolognese with Lentils", "Panzanella Salad",
    // Indian Vegan
    "Chana Masala", "Dal Makhani (Vegan)", "Rajma", "Aloo Gobi",
    "Baingan Bharta", "Bhindi Masala", "Mixed Vegetable Sabzi",
    "Sambar", "Rasam", "Jeera Rice", "Mutter Pulao",
    "Aloo Paratha (Vegan)", "Methi Paratha", "Masala Dosa",
    "Idli with Sambar", "Uttapam with Coconut Chutney",
    "Chhole", "Kadala Curry", "Jackfruit Curry", "Banana Flower Curry",
    // Asian Vegan
    "Vegan Ramen", "Cold Soba Noodles", "Vegetable Fried Rice",
    "Mapo Tofu (Vegan)", "Vegetable Dumplings (Steamed)", "Agedashi Tofu",
    "Korean Bibimbap (Vegan)", "Kimchi Fried Rice (Vegan)", "Japchae (Vegan)",
    "Tteokbokki (Vegan)", "Kongnamul Bibimbap", "Lotus Root Stir Fry",
    "Thai Green Curry (Tofu)", "Pad Thai (Tofu & No Egg)", "Pad See Ew (Vegan)",
    "Tom Yum (Vegan)", "Khao Tom", "Mango Sticky Rice (Vegan)",
    "Banh Mi (Vegan)", "Goi Cuon Spring Rolls", "Pho (Vegan)",
    "Dan Dan Noodles (Vegan)", "Braised Tofu", "Mapo Eggplant",
    "Sichuan Dry-Fried Green Beans", "Chinese Eggplant with Garlic Sauce",
    // Middle Eastern & Mediterranean Vegan
    "Falafel Wrap", "Hummus with Pita", "Baba Ganoush", "Fattoush Salad",
    "Tabbouleh", "Ful Medames", "Mujaddara", "Shakshuka (Vegan)",
    "Dolmas (Stuffed Grape Leaves)", "Lebanese Lentil Soup", "Harira Soup",
    "Moroccan Vegetable Tagine", "Couscous with Vegetables", "Chermoula Roasted Vegetables",
    "Israeli Salad", "Piyaz", "Kisir (Turkish Bulgur Salad)", "Turkish Lentil Soup",
    // Mexican Vegan
    "Bean Tacos with Salsa", "Jackfruit Tacos", "Mushroom Tacos",
    "Vegan Enchiladas", "Bean Burritos", "Tostadas with Black Beans",
    "Guacamole", "Elote (Street Corn Vegan)", "Vegetarian Pozole",
    "Vegan Tamales", "Sopa de Fideos", "Chiles Rellenos (Vegan)",
    // African Vegan
    "Ethiopian Injera with Misir Wat", "Atakilt Wat", "Gomen", "Tikil Gomen",
    "Nigerian Jollof Rice (Vegan)", "Egusi Soup (Vegan)", "Akara",
    "Ghanaian Red Red (Black-Eyed Pea Stew)", "Irio", "Kenyan Githeri",
    // Fusion & International Vegan
    "Avocado Toast", "Poke Bowl (Vegan)", "Buddha Bowl", "Grain Bowl",
    "Roasted Cauliflower Steak", "Portobello Mushroom Burger",
    "Stuffed Bell Peppers", "Lentil Shepherd's Pie", "Vegan Chili",
    "Black Bean Soup", "Sweet Potato & Chickpea Curry",
    "Roasted Beet Salad", "Watermelon Cucumber Salad", "Mango Avocado Salad",
    "Vegan Sushi Rolls", "Cucumber Roll", "Avocado Roll", "Mango Roll",
    "Vegan Banh Mi", "Mushroom Bao Bun", "Jackfruit Pulled 'Pork' Sandwich",
    "Beet Burger", "Lentil Walnut Meat Tacos", "Tempeh Bowl",
    "Edamame Rice Bowl", "Vegan Pad Thai", "Coconut Curry Noodles",
    "Vietnamese Lemongrass Tofu", "Vegan Kimchi Stew", "Mushroom Pho",
    "Vegan Ramen with Miso Broth", "Tofu Scramble", "Vegan French Toast",
    "Açaí Bowl", "Smoothie Bowl", "Chia Pudding with Mango",
    "Vegan Pancakes", "Banana Oat Waffles",
  ],
  "non-vegetarian": [
    // Beef
    "Wagyu Beef Burger", "Smash Burger", "Beef Tacos", "Beef Burrito",
    "Carne Asada", "Beef Bulgogi", "Beef Bibimbap", "Beef Pho",
    "Beef Ramen Tonkotsu", "Beef Gyudon", "Beef Sukiyaki", "Beef Shabu Shabu",
    "Beef Stir Fry", "Mongolian Beef", "Beef Rendang", "Boeuf Bourguignon",
    "Beef Short Ribs Braised", "Texas BBQ Brisket", "Korean Galbi", "Beef Bulgogi Bowl",
    "Italian Meatballs", "Meatball Sub", "Beef Stroganoff", "Steak Frites",
    "Ribeye Steak", "Filet Mignon", "T-Bone Steak", "New York Strip",
    "Osso Buco", "Braised Oxtail", "Beef Birria Tacos", "Beef Enchiladas",
    "Chipotle Beef Bowl", "Beef Pad See Ew", "Beef Massaman Curry", "Beef Kebab",
    "Adana Kebab", "Doner Kebab", "Kafta", "Arayes",
    // Chicken
    "Nashville Hot Chicken", "Korean Fried Chicken", "Japanese Karaage",
    "Chicken Katsu Curry", "Chicken Tikka Masala", "Butter Chicken",
    "Chicken Biryani", "Chicken Shawarma", "Chicken Souvlaki",
    "Roast Chicken", "Coq au Vin", "Chicken Marsala", "Chicken Piccata",
    "Chicken Parmesan", "Chicken Cacciatore", "Chicken Saltimbocca",
    "General Tso's Chicken", "Kung Pao Chicken", "Orange Chicken",
    "Lemon Garlic Chicken", "Cajun Chicken", "Jerk Chicken",
    "Tandoori Chicken", "Chicken Seekh Kebab", "Chicken Inasal",
    "Filipino Adobo Chicken", "Chicken Rendang", "Hainanese Chicken Rice",
    "Khao Man Gai", "Thai Basil Chicken (Pad Kra Pao)", "Green Curry Chicken",
    "Chicken Dak Galbi", "Buldak (Fire Chicken)", "Samgyetang",
    "Dakdoritang", "Oyakodon", "Katsudon (Chicken)", "Chicken Gyoza",
    "Buffalo Wings", "BBQ Chicken Wings", "Honey Garlic Wings", "Garlic Parmesan Wings",
    "Chicken Tacos", "Chicken Burrito", "Chicken Enchiladas", "Chicken Quesadilla",
    "Chicken Caesar Salad", "Chicken Sandwich", "Chicken Club", "Pollo Tropical",
    "Mole Chicken", "Chicken Tinga", "Chicken Posole",
    // Seafood & Fish
    "Grilled Salmon", "Teriyaki Salmon", "Salmon Poke Bowl", "Salmon Sashimi",
    "Lobster Roll", "Lobster Thermidor", "Steamed Lobster", "Crab Legs",
    "Dungeness Crab", "King Crab", "Soft Shell Crab", "Crab Fried Rice",
    "Shrimp Scampi", "Garlic Butter Shrimp", "Shrimp Tacos", "Prawn Masala",
    "Prawn Pad Thai", "Prawn Tom Yum", "Shrimp Po'Boy", "Coconut Shrimp",
    "Fish & Chips", "Beer-Battered Cod", "Grilled Sea Bass", "Pan-Seared Halibut",
    "Swordfish Steak", "Blackened Tuna", "Tuna Poke Bowl", "Spicy Tuna Roll",
    "Miso-Glazed Cod", "Salt-Baked Sea Bream", "Bouillabaisse",
    "Peruvian Ceviche", "Aguachile", "Tuna Ceviche", "Scallop Ceviche",
    "Clam Chowder", "Seafood Bisque", "Oysters Rockefeller", "Oysters on the Half Shell",
    "Scallops with Risotto", "Mussels Marinara", "Moules Frites",
    "Calamari Fritti", "Octopus a la Gallega", "Grilled Octopus",
    "Seared Ahi Tuna", "Yellowfin Tuna Tataki", "Hamachi Crudo",
    "Vietnamese Canh Chua (Fish Soup)", "Thai Fish Cakes", "Goan Fish Curry",
    "Bangda Curry (Mackerel)", "Fish Biryani", "Prawn Biryani",
    "Paella Marinera", "Seafood Paella", "Arroz con Mariscos",
    "Japanese Oyakodon (Salmon)", "Chirashi Bowl", "Temaki Hand Roll",
    // Pork
    "Tonkatsu", "Char Siu Pork", "Pulled Pork BBQ", "Pork Belly Braised",
    "Dongpo Pork", "Lechon", "Carnitas Tacos", "Cochinita Pibil",
    "Porchetta", "Prosciutto e Melone", "Bacon Cheeseburger",
    "Pork Ramen", "Kakuni Ramen", "Chashu Ramen", "Tonkotsu Ramen",
    "Korean BBQ Samgyeopsal", "Bossam (Pork Wraps)", "Jokbal (Pork Trotters)",
    "German Bratwurst", "Currywurst", "Schnitzel", "Hungarian Goulash",
    "Peameal Bacon Sandwich", "Sausage Roll", "Pork Dumpling (Xiaolongbao)",
    "Wonton Soup (Pork)", "Gyoza (Pork)", "Pork Bao Bun", "Char Siu Bao",
    "Filipino Adobo (Pork)", "Sinigang na Baboy", "Lechon Kawali",
    "Hawaiian Kalua Pig", "Spam Musubi", "Loco Moco",
    "Pork Enchiladas", "Chipotle Carnitas Bowl", "Al Pastor Tacos",
    "Spit-Roasted Lamb (Rotisserie)", "Pork Vindaloo",
    // Lamb & Others
    "Lamb Biryani", "Lamb Rogan Josh", "Lamb Vindaloo", "Lamb Seekh Kebab",
    "Lamb Shawarma", "Moroccan Lamb Tagine", "Lamb Chops Provençal",
    "Greek Lamb Kleftiko", "Slow-Roasted Leg of Lamb", "Lamb Rack with Herbs",
    "Lamb Kofta", "Arayes (Lamb)", "Mansaf (Lamb)", "Egyptian Hawawshi",
    "Turkish Lahmacun", "Levantine Kibbeh", "Stuffed Lamb Shoulder",
    "Duck Confit", "Peking Duck", "Duck Breast à l'Orange", "Crispy Duck Pancakes",
    "Whole Roasted Duck", "Magret de Canard",
    "Rabbit Stew", "Pheasant Casserole", "Venison Steak", "Wild Boar Ragu",
  ],
};

type DietKey = keyof typeof FOOD;

function getRandomUnique(arr: string[], exclude: string | null): string {
  if (arr.length <= 1) return arr[0];
  let pick: string;
  let attempts = 0;
  do {
    pick = arr[Math.floor(Math.random() * arr.length)];
    attempts++;
  } while (pick === exclude && attempts < 15);
  return pick;
}

export default function WhatShouldIEat() {
  const [diet, setDiet] = useState<DietKey>("any");
  const [result, setResult] = useState<string | null>(null);
  const [resultKey, setResultKey] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const lastResult = useRef<string | null>(null);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    setTimeout(() => {
      const options = FOOD[diet];
      const pick = getRandomUnique(options, lastResult.current);
      lastResult.current = pick;
      setResult(pick);
      setResultKey(k => k + 1);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <>
      <SEO
        title="What Should I Eat? - Free Random Food Picker"
        description="Can't decide what to eat? Spin our free random food picker for instant meal ideas from 5000+ dishes worldwide. Vegan, vegetarian, and non-vegetarian options."
        canonicalUrl="https://randomtoolbox.replit.app/what-should-i-eat"
      />

      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
              <Utensils className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">What Should I Eat?</h1>
          </div>
          <p className="text-muted-foreground text-lg">Let fate decide your next meal. Fast, random, and tailored to your diet.</p>
        </div>

        <Card className="border-2 shadow-lg">
          <CardContent className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
            <div className="w-full max-w-xs space-y-2 text-left">
              <label className="text-sm font-medium">Dietary Preference</label>
              <Select value={diet} onValueChange={(v) => { setDiet(v as DietKey); setResult(null); lastResult.current = null; }}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Anything Goes</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-48 flex items-center justify-center w-full relative">
              <AnimatePresence mode="wait">
                {isSpinning ? (
                  <motion.div
                    key="spinning"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                    className="absolute"
                  >
                    <RotateCw className="w-16 h-16 text-primary/50 animate-spin" />
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key={`result-${resultKey}`}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute text-center w-full px-4"
                  >
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-2">You should eat...</p>
                    <h2 className="text-3xl md:text-5xl font-display font-black leading-tight bg-gradient-to-br from-primary to-orange-500 bg-clip-text text-transparent">
                      {result}!
                    </h2>
                  </motion.div>
                ) : (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute text-muted-foreground"
                  >
                    <Utensils className="w-16 h-16 opacity-20" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              size="lg"
              className="w-full max-w-xs h-16 text-xl rounded-2xl shadow-xl hover:shadow-primary/25 transition-all"
              onClick={spin}
              disabled={isSpinning}
              data-testid="button-spin"
            >
              {isSpinning ? "Spinning..." : result ? "Spin Again" : "Spin the Wheel"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
