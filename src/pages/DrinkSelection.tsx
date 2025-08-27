import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Drink {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  price?: string;
}

interface CartItem extends Drink {
  quantity: number;
}

function DrinkSelection() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('beer');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const drinks: Record<string, Drink[]> = {
    beer: [
      {
        id: 'windhoek-lager',
        name: 'Windhoek Lager',
        category: 'beer',
        image: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Namibia\'s premium lager beer, crisp and refreshing'
      },
      {
        id: 'tafel-lager',
        name: 'Tafel Lager',
        category: 'beer',
        image: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Light and smooth Namibian beer'
      },
      {
        id: 'windhoek-draught',
        name: 'Windhoek Draught',
        category: 'beer',
        image: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Fresh draught beer with authentic Namibian taste'
      },
      {
        id: 'camelthorn-weiss',
        name: 'Camelthorn Weiss',
        category: 'beer',
        image: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Namibian wheat beer with citrus notes'
      }
    ],
    wine: [
      {
        id: 'kristall-kellerei-red',
        name: 'Kristall Kellerei Red',
        category: 'wine',
        image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Premium Namibian red wine'
      },
      {
        id: 'kristall-kellerei-white',
        name: 'Kristall Kellerei White',
        category: 'wine',
        image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Crisp Namibian white wine'
      },
      {
        id: 'orange-river-cellars',
        name: 'Orange River Cellars',
        category: 'wine',
        image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Local wine from the Orange River region'
      }
    ],
    traditional: [
      {
        id: 'oshikundu',
        name: 'Oshikundu',
        category: 'traditional',
        image: 'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Traditional fermented drink made from millet'
      },
      {
        id: 'otombo',
        name: 'Otombo',
        category: 'traditional',
        image: 'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Traditional Namibian alcoholic beverage'
      },
      {
        id: 'marula-beer',
        name: 'Marula Beer',
        category: 'traditional',
        image: 'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Traditional beer made from marula fruit'
      }
    ],
    soft: [
      {
        id: 'coca-cola',
        name: 'Coca-Cola',
        category: 'soft',
        image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Classic Coca-Cola'
      },
      {
        id: 'fanta-orange',
        name: 'Fanta Orange',
        category: 'soft',
        image: 'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Refreshing orange soda'
      },
      {
        id: 'sprite',
        name: 'Sprite',
        category: 'soft',
        image: 'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Lemon-lime soda'
      },
      {
        id: 'rooibos-tea',
        name: 'Rooibos Tea',
        category: 'soft',
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Traditional South African red bush tea'
      }
    ]
  };

  const categories = [
    { id: 'beer', name: 'Namibian Beer', icon: '🍺' },
    { id: 'wine', name: 'Local Wine', icon: '🍷' },
    { id: 'traditional', name: 'Traditional Brews', icon: '🥃' },
    { id: 'soft', name: 'Soft Drinks', icon: '🥤' }
  ];

  const addToCart = (drink: Drink) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === drink.id);
      if (existing) {
        return prev.map(item =>
          item.id === drink.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...drink, quantity: 1 }];
    });
  };

  const removeFromCart = (drinkId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === drinkId);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.id === drinkId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter(item => item.id !== drinkId);
    });
  };

  const getCartItemQuantity = (drinkId: string) => {
    return cart.find(item => item.id === drinkId)?.quantity || 0;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const saveSelection = () => {
    localStorage.setItem('drinkSelection', JSON.stringify(cart));
    alert('Drink selection saved! This will be noted for the event.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-green-600 hover:text-green-800"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Event</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-green-800">Drinks Menu</h1>
              <p className="text-gray-600">Select your preferred beverages</p>
            </div>
          </div>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Selection</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-green-600 hover:bg-green-50'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Drinks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {drinks[selectedCategory]?.map(drink => (
            <div key={drink.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">{drink.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{drink.description}</p>
                
                <div className="flex items-center justify-between">
                  {getCartItemQuantity(drink.id) > 0 ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeFromCart(drink.id)}
                        className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold text-green-800 min-w-[2rem] text-center">
                        {getCartItemQuantity(drink.id)}
                      </span>
                      <button
                        onClick={() => addToCart(drink)}
                        className="w-8 h-8 bg-green-100 hover:bg-green-200 text-green-600 rounded-full flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(drink)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-full max-w-md h-full overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Your Selection</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No drinks selected yet</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-6 h-6 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => addToCart(item)}
                              className="w-6 h-6 bg-green-100 hover:bg-green-200 text-green-600 rounded-full flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={saveSelection}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
                    >
                      <Check className="w-5 h-5" />
                      <span>Save Selection</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-green-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-bold text-green-800 mb-2">About Our Drinks</h3>
          <p className="text-gray-700">
            We're proud to feature authentic Namibian beverages alongside international favorites. 
            All drinks will be served fresh at the event. Your selection helps us prepare the right quantities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DrinkSelection;