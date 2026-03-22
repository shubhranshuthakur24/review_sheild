<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BusinessResource;
use App\Models\Business;
use Illuminate\Http\Request;

class BusinessController extends Controller
{
    public function index()
    {
        return BusinessResource::collection(Business::all());
    }

    public function show($id)
    {
        return new BusinessResource(Business::findOrFail($id));
    }
}
