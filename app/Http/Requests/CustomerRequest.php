<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|max:150',
            'lastname' => 'required|max:255',
            'email' => 'sometimes|required|email|unique:addresses',
            'phone_regular' => 'required|max:20|unique:addresses',
            'address1' => 'required|max:150',
            'address2' => 'sometimes|max:150',
            'country_id' => 'required|numeric',
            'city_id' => 'required|numeric',
            'language_id' => 'required|numeric',
            'currency_id' => 'required|numeric',
            'gender' => [
                'required',
                Rule::in(['H','F']),
            ],
            'postcode' => 'sometimes|max:50'

        ];
    }

}
