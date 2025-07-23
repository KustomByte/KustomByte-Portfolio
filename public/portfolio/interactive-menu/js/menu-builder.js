class MenuBuilder {
    constructor(menuData) {
        this.menuData = menuData;
        this.selectedItems = {
            appetizers: [],
            pasta: [],
            proteinAddons: [],
            desserts: []
        };
        // Add object to track quantities
        this.itemQuantities = {
            appetizers: {},
            pasta: {},
            proteinAddons: {},
            desserts: {}
        };
        // Load favorites from local storage
        this.favorites = JSON.parse(localStorage.getItem('bellaFavorites')) || [];
        this.initializeMenu();
        this.createGalleryModal();
    }
    
    initializeMenu() {
        // Render appetizers
        this.renderMenuItems('appetizers', document.querySelector('#appetizers .items-container'));
        
        // Render pasta dishes
        this.renderMenuItems('pasta', document.querySelector('#pasta .items-container'));
        
        // Render protein add-ons
        this.renderAddOns();
        
        // Render desserts
        this.renderMenuItems('desserts', document.querySelector('#desserts .items-container'));
        
        // Initialize order summary
        this.updateOrderSummary();
    }
    
    createGalleryModal() {
        // Create modal to display images in large format
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img id="modal-image">
                <div class="modal-details">
                    <h3 id="modal-title"></h3>
                    <p id="modal-description"></p>
                    <p id="modal-price"></p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close modal event
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        this.galleryModal = modal;
    }
    
    renderMenuItems(category, container) {
        this.menuData[category].forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            itemElement.dataset.id = item.id;
            
            // Add image if available
            const imageHtml = item.image ? 
                `<div class="menu-item-image" style="background-image: url('${item.image}')"></div>` : '';
            
            itemElement.innerHTML = `
                ${imageHtml}
                <div class="menu-item-content">
                    <h4>${item.name}</h4>
                    <p class="description">${item.description}</p>
                    <p class="price">$${item.price.toFixed(2)}</p>
                    ${category === 'desserts' || category === 'appetizers' ? 
                        `<div class="quantity-controls">
                            <span class="quantity">0</span>
                            <div class="quantity-buttons">
                                <button class="quantity-btn minus">-</button>
                                <button class="quantity-btn plus">+</button>
                            </div>
                        </div>` : ''}
                </div>
            `;
            
            // Add favorite button
            const isFavorite = this.favorites.includes(item.id);
            const favoriteBtn = document.createElement('button');
            favoriteBtn.className = `favorite-btn ${isFavorite ? 'active' : ''}`;
            favoriteBtn.innerHTML = '❤';
            favoriteBtn.title = isFavorite ? 'Remove from favorites' : 'Add to favorites';
            
            favoriteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFavorite(item.id, favoriteBtn);
            });
            
            itemElement.appendChild(favoriteBtn);
            
            // Add entrance animation with progressive delay
            itemElement.style.opacity = '0';
            itemElement.style.transform = 'translateY(20px)';
            itemElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            itemElement.style.transitionDelay = `${index * 0.1}s`;
            
            setTimeout(() => {
                itemElement.style.opacity = '1';
                itemElement.style.transform = 'translateY(0)';
            }, 100);
            
            // If item has an image, add event to open the gallery modal
            if (item.image) {
                const imageElement = itemElement.querySelector('.menu-item-image');
                imageElement.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openGallery(item);
                });
            }
            
            // For pasta, keep simple selection
            if (category === 'pasta') {
                itemElement.addEventListener('click', () => {
                    document.querySelectorAll('#pasta .menu-item').forEach(el => {
                        el.classList.remove('selected');
                    });
                    this.selectedItems.pasta = [];
                    this.addToSelection(category, item);
                    itemElement.classList.add('selected');
                    this.updateOrderSummary();
                });
            } else if (category === 'desserts' || category === 'appetizers') {
                // Initialize quantity
                this.itemQuantities[category][item.id] = 0;
                
                // Add event handlers for buttons
                itemElement.addEventListener('click', (e) => {
                    // Do nothing if clicking a button
                    if (e.target.classList.contains('quantity-btn') || e.target.classList.contains('favorite-btn')) {
                        return;
                    }
                    
                    // Select the item
                    if (!itemElement.classList.contains('selected')) {
                        this.addToSelection(category, item);
                        itemElement.classList.add('selected');
                        // Set quantity to 1
                        this.itemQuantities[category][item.id] = 1;
                        itemElement.querySelector('.quantity').textContent = '1';
                    }
                    this.updateOrderSummary();
                });
                
                // Plus button handler
                const plusBtn = itemElement.querySelector('.plus');
                plusBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    if (!itemElement.classList.contains('selected')) {
                        itemElement.classList.add('selected');
                        this.addToSelection(category, item);
                    }
                    
                    this.itemQuantities[category][item.id]++;
                    itemElement.querySelector('.quantity').textContent = this.itemQuantities[category][item.id];
                    this.updateOrderSummary();
                });
                
                // Minus button handler
                const minusBtn = itemElement.querySelector('.minus');
                minusBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    if (this.itemQuantities[category][item.id] > 0) {
                        this.itemQuantities[category][item.id]--;
                        itemElement.querySelector('.quantity').textContent = this.itemQuantities[category][item.id];
                        
                        if (this.itemQuantities[category][item.id] === 0) {
                            itemElement.classList.remove('selected');
                            this.removeFromSelection(category, item);
                        }
                        
                        this.updateOrderSummary();
                    }
                });
            }
            
            container.appendChild(itemElement);
        });
    }
    
    openGallery(item) {
        this.galleryModal.querySelector('#modal-image').src = item.image;
        this.galleryModal.querySelector('#modal-title').textContent = item.name;
        this.galleryModal.querySelector('#modal-description').textContent = item.description;
        this.galleryModal.querySelector('#modal-price').textContent = `$${item.price.toFixed(2)}`;
        this.galleryModal.style.display = 'flex';
    }
    
    toggleFavorite(itemId, button) {
        const index = this.favorites.indexOf(itemId);
        
        if (index === -1) {
            this.favorites.push(itemId);
            button.classList.add('active');
            button.title = 'Remove from favorites';
        } else {
            this.favorites.splice(index, 1);
            button.classList.remove('active');
            button.title = 'Add to favorites';
        }
        
        localStorage.setItem('bellaFavorites', JSON.stringify(this.favorites));
    }
    
    renderAddOns() {
        const container = document.querySelector('.add-ons-container');
        this.menuData.proteinAddons.forEach(addon => {
            const addonElement = document.createElement('div');
            addonElement.className = 'add-on';
            addonElement.dataset.id = addon.id;
            addonElement.textContent = `${addon.name} +$${addon.price.toFixed(2)}`;
            
            addonElement.addEventListener('click', () => {
                addonElement.classList.toggle('selected');
                
                if (addonElement.classList.contains('selected')) {
                    this.addToSelection('proteinAddons', addon);
                } else {
                    this.removeFromSelection('proteinAddons', addon);
                }
                this.updateOrderSummary();
            });
            
            container.appendChild(addonElement);
        });
    }
    
    addToSelection(category, item) {
        if (category === 'pasta') {
            this.selectedItems[category] = [item];
        } else if (category === 'desserts' || category === 'appetizers') {
            // For desserts and appetizers, check if already present
            const existing = this.selectedItems[category].findIndex(i => i.id === item.id);
            if (existing === -1) {
                this.selectedItems[category].push(item);
            }
        } else {
            if (!this.selectedItems[category].some(i => i.id === item.id)) {
                this.selectedItems[category].push(item);
            }
        }
    }
    
    removeFromSelection(category, item) {
        this.selectedItems[category] = this.selectedItems[category].filter(i => i.id !== item.id);
    }
    
    calculateTotal() {
        let total = 0;
        
        // Add pasta dishes and add-ons
        this.selectedItems.pasta.forEach(item => {
            total += item.price;
        });
        
        this.selectedItems.proteinAddons.forEach(item => {
            total += item.price;
        });
        
        // Add appetizers considering quantities
        this.selectedItems.appetizers.forEach(item => {
            total += item.price * this.itemQuantities.appetizers[item.id];
        });
        
        // Add desserts considering quantities
        this.selectedItems.desserts.forEach(item => {
            total += item.price * this.itemQuantities.desserts[item.id];
        });
        
        return total;
    }
    
    updateOrderSummary() {
        const summaryContainer = document.getElementById('selected-items');
        summaryContainer.innerHTML = '';
        
        // Check if any items are selected
        const hasSelectedItems = Object.values(this.selectedItems).some(arr => arr.length > 0);
        
        if (!hasSelectedItems) {
            summaryContainer.innerHTML = '<p>No items selected yet.</p>';
        } else {
            // Add appetizers to summary with quantities
            this.addCategoryWithQuantitiesToSummary('Appetizers', this.selectedItems.appetizers, summaryContainer, 'appetizers');
            
            // Add pasta and protein add-ons
            if (this.selectedItems.pasta.length > 0) {
                this.addCategoryToSummary('Pasta', this.selectedItems.pasta, summaryContainer);
                
                // If pasta is selected and has protein add-ons
                if (this.selectedItems.proteinAddons.length > 0) {
                    this.addCategoryToSummary('Protein Add-ons', this.selectedItems.proteinAddons, summaryContainer);
                }
            }
            
            // Add desserts to summary with quantities
            this.addCategoryWithQuantitiesToSummary('Desserts', this.selectedItems.desserts, summaryContainer, 'desserts');
        }
        
        // Update total price
        document.getElementById('total-price').textContent = `Total: $${this.calculateTotal().toFixed(2)}`;
    }
    
    // Original method maintained for pasta and proteins
    addCategoryToSummary(categoryName, items, container) {
        if (items.length === 0) return;
        
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'selected-item';
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            `;
            container.appendChild(itemElement);
        });
    }
    
    // New method for desserts and appetizers
    addCategoryWithQuantitiesToSummary(categoryName, items, container, category) {
        if (items.length === 0) return;
        
        items.forEach(item => {
            const quantity = this.itemQuantities[category][item.id];
            const itemPrice = item.price * quantity;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'selected-item';
            itemElement.innerHTML = `
                <span>${item.name} <strong>× ${quantity}</strong></span>
                <span>$${itemPrice.toFixed(2)}</span>
            `;
            container.appendChild(itemElement);
        });
    }
}