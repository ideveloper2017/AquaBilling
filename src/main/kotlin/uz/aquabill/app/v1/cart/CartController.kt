package uz.aquabill.app.v1.cart

import uz.aquabill.app.v1.user.model.User
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.responses.ApiResponse as SwaggerApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses as SwaggerApiResponses
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import uz.aquabill.app.v1.order.model.Order


/**
 * REST controller for managing shopping cart operations.
 */
@RestController
@RequestMapping(
    value = ["/api/cart"],
    produces = [MediaType.APPLICATION_JSON_VALUE]
)
@Tag(name = "Shopping Cart", description = "Operations related to shopping cart")
@SecurityRequirement(name = "bearerAuth")
class CartController(private val cartService: CartService) {
    
    @GetMapping
    @Operation(
        summary = "Get current user's cart",
        description = "Retrieves the current user's shopping cart with all items"
    )
    @SwaggerApiResponses(
        value = [
            SwaggerApiResponse(
                responseCode = "200",
                description = "Successfully retrieved cart",
                content = [Content(mediaType = "application/json", schema = Schema(implementation = Cart::class))]
            ),
            SwaggerApiResponse(
                responseCode = "404",
                description = "Cart not found",
                content = [Content(mediaType = "application/json", schema = Schema(implementation = uz.aquabill.app.common.ApiResponse::class))]
            )
        ]
    )
    fun getCart(
        @Parameter(hidden = true)
        @AuthenticationPrincipal user: User
    ): ResponseEntity<uz.aquabill.app.common.ApiResponse<Cart>> {
        val cart = cartService.getCartWithItems(user) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(uz.aquabill.app.common.ApiResponse.success(cart))
    }
    
    @PostMapping("/items")
    @Operation(
        summary = "Add item to cart",
        description = "Adds a product to the current user's shopping cart"
    )
    @SwaggerApiResponses(
        value = [
            SwaggerApiResponse(
                responseCode = "201",
                description = "Successfully added item to cart",
                content = [Content(mediaType = "application/json", schema = Schema(implementation = Cart::class))]
            ),
            SwaggerApiResponse(
                responseCode = "400",
                description = "Invalid input or product not found",
                content = [Content(mediaType = "application/json", schema = Schema(implementation = uz.aquabill.app.common.ApiResponse::class))]
            ),
            SwaggerApiResponse(
                responseCode = "404",
                description = "Product not found or out of stock",
                content = [Content(mediaType = "application/json", schema = Schema(implementation = uz.aquabill.app.common.ApiResponse::class))]
            )
        ]
    )
    fun addItemToCart(
        @Parameter(hidden = true)
        @AuthenticationPrincipal user: User,
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Item to add to cart",
            required = true,
            content = [Content(mediaType = "application/json")]
        )
        @RequestBody request: AddItemRequest
    ): ResponseEntity<uz.aquabill.app.common.ApiResponse<Cart>> {
        val cart = cartService.addItemToCart(user, request.productId, request.quantity)
        return ResponseEntity.status(HttpStatus.CREATED).body(uz.aquabill.app.common.ApiResponse.success(cart))
    }
    
    @PutMapping("/items/{productId}")
    @Operation(
        summary = "Update cart item quantity",
        description = "Updates the quantity of a specific item in the cart"
    )
    @SwaggerApiResponses(
        value = [
            SwaggerApiResponse(
                responseCode = "200",
                description = "Successfully updated cart item",
                content = [Content(mediaType = "application/json", schema = Schema(implementation = Cart::class))]
            ),
            SwaggerApiResponse(
                responseCode = "400",
                description = "Invalid quantity or product not in cart",
                content = [Content(mediaType = "application/json", schema = Schema(implementation = uz.aquabill.app.common.ApiResponse::class))]
            ),
            SwaggerApiResponse(
                responseCode = "404",
                description = "Cart item not found",
                content = [Content(mediaType = "application/json", schema = Schema(implementation = uz.aquabill.app.common.ApiResponse::class))]
            )
        ]
    )
    fun updateCartItem(
        @Parameter(hidden = true)
        @AuthenticationPrincipal user: User,
        @Parameter(description = "ID of the product to update in cart", required = true)
        @PathVariable productId: Long,
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Updated quantity for the cart item",
            required = true,
            content = [Content(mediaType = "application/json")]
        )
        @RequestBody request: UpdateItemRequest
    ): ResponseEntity<uz.aquabill.app.common.ApiResponse<Cart>> {
        val cart = cartService.updateCartItem(user, productId, request.quantity)
        return ResponseEntity.ok(uz.aquabill.app.common.ApiResponse.success(cart))
    }
    
    @DeleteMapping("/items/{productId}")
    @Operation(
        summary = "Remove item from cart",
        description = "Removes a specific item from the shopping cart"
    )
    @SwaggerApiResponses(
        value = [
            SwaggerApiResponse(
                responseCode = "200",
                description = "Successfully removed item from cart",
                content = [Content(mediaType = "application/json", schema = Schema(implementation = Cart::class))]
            ),
            SwaggerApiResponse(
                responseCode = "404",
                description = "Cart or cart item not found",
                content = [Content(mediaType = "application/json", schema = Schema(implementation = uz.aquabill.app.common.ApiResponse::class))]
            )
        ]
    )
    fun removeItemFromCart(
        @Parameter(hidden = true)
        @AuthenticationPrincipal user: User,
        @Parameter(description = "ID of the product to remove from cart", required = true)
        @PathVariable productId: Long
    ): ResponseEntity<uz.aquabill.app.common.ApiResponse<Cart>> {
        val cart = cartService.removeItemFromCart(user, productId)
        return ResponseEntity.ok(uz.aquabill.app.common.ApiResponse.success(cart))
    }
    
    @DeleteMapping
    @Operation(
        summary = "Clear cart",
        description = "Removes all items from the shopping cart"
    )
    @SwaggerApiResponses(
        value = [
            SwaggerApiResponse(
                responseCode = "200",
                description = "Successfully cleared cart",
                content = [Content(mediaType = "application/json", schema = Schema(implementation = Cart::class))]
            ),
            SwaggerApiResponse(
                responseCode = "404",
                description = "Cart not found",
                content = [Content(mediaType = "application/json", schema = Schema(implementation = uz.aquabill.app.common.ApiResponse::class))]
            )
        ]
    )
    fun clearCart(
        @Parameter(hidden = true)
        @AuthenticationPrincipal user: User
    ): ResponseEntity<uz.aquabill.app.common.ApiResponse<Cart>> {
        val cart = cartService.clearCart(user)
        return ResponseEntity.ok(uz.aquabill.app.common.ApiResponse.success(cart))
    }
    
    @PostMapping("/checkout")
    @Operation(
        summary = "Checkout",
        description = "Processes the current cart and creates an order"
    )
    @SwaggerApiResponses(
        value = [
            SwaggerApiResponse(
                responseCode = "201",
                description = "Successfully created order",
                content = [Content(mediaType = "application/json", schema = Schema(implementation = Order::class))]
            ),
            SwaggerApiResponse(
                responseCode = "400",
                description = "Cart is empty or invalid",
                content = [Content(mediaType = "application/json", schema = Schema(implementation = uz.aquabill.app.common.ApiResponse::class))]
            ),
            SwaggerApiResponse(
                responseCode = "404",
                description = "Cart not found",
                content = [Content(mediaType = "application/json", schema = Schema(implementation = uz.aquabill.app.common.ApiResponse::class))]
            )
        ]
    )
    fun checkout(
        @Parameter(hidden = true)
        @AuthenticationPrincipal user: User,
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Optional checkout notes",
            required = false,
            content = [Content(mediaType = "application/json")]
        )
        @RequestBody request: CheckoutRequest?
    ): ResponseEntity<uz.aquabill.app.common.ApiResponse<Order>> {
        val order = cartService.checkoutCart(user, request?.notes)
        return ResponseEntity.status(HttpStatus.CREATED).body(uz.aquabill.app.common.ApiResponse.success(order))
    }
}

@Schema(description = "Request object for adding an item to the cart")
data class AddItemRequest(
    @field:Schema(description = "ID of the product to add to cart", required = true, example = "123e4567-e89b-12d3-a456-426614174000")
    val productId: Long,
    
    @field:Schema(description = "Quantity to add (default: 1)", minimum = "1", example = "1")
    val quantity: Int = 1
)

@Schema(description = "Request object for updating cart item quantity")
data class UpdateItemRequest(
    @field:Schema(description = "New quantity for the item (must be at least 1)", minimum = "1", example = "2")
    val quantity: Int
)

@Schema(description = "Request object for cart checkout")
data class CheckoutRequest(
    @field:Schema(description = "Optional notes for the order", nullable = true, example = "Please deliver after 5 PM")
    val notes: String? = null
)
