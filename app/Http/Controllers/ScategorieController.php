<?php

namespace App\Http\Controllers;

use App\Models\Scategorie;
use Illuminate\Http\Request;

class ScategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $scategories = Scategorie::with('categories')->get();
        return $scategories; 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $scategorie = new Scategorie([
            'nomscategorie' => $request->input('nomscategorie'),
            'imagescategorie' => $request->input('imagescategorie'),
            'categorieID' => $request->input('categorieID'),
            ]);
            $scategorie->save();
            return response()->json($scategorie,201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
       

        $scategorie = Scategorie::find($id);
        return response()->json($scategorie);
    }
  
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $scategorie = Scategorie::find($id);
    $scategorie->update($request->all());
    return response()->json($scategorie,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Scategorie $scategorie)
    {
        $scategorie = Scategorie::find($id);
        $scategorie->delete();
        return response()->json('Scategorie supprimée !');
    }
    
public function showSCategorieByCAT($idcat)
{
 $Scategorie= Scategorie::where('categorieID', $idcat)->with('categories')->get();
return response()->json($Scategorie);
}

}
