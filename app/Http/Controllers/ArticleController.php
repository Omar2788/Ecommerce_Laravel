<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::with('scategories')->get();
        return $articles; 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $article = new Article([
            'designation' => $request->input('designation'),
            'marque' => $request->input('marque'),
            'reference' => $request->input('reference'),
            'qtestock' => $request->input('qtestock'),
            'prix' => $request->input('prix'),
            'imageart' => $request->input('imageart'),
            'scategorieID' => $request->input('scategorieID')
            ]);
            $article->save();
            return response()->json($article,200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $article= Article::find($id);
        return response()->json($article);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id,Request $request)
    {
        $article = Article::find($id);
$article->update($request->all());
return response()->json($article,201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $article = Article::find($id);
$article->delete();
return response()->json('Article supprimé !');
    }
}
