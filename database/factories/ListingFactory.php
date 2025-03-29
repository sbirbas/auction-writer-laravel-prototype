<?php

namespace Database\Factories;

use App\Models\Listing;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Listing>
 */
class ListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'user_id' => 1,
            'image' => 'https://i.ebayimg.com/images/g/nhQAAOSw99tmRXnL/s-l1200.jpg',
            'estimate' => fake()->numberBetween(1,20),
            'sale_order' => fake()->randomNumber(5),
        ];
    }
}
