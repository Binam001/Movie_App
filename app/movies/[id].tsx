import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { icons } from '@/constants/icons';

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({label, value}: MovieInfoProps) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'>
      {label}
    </Text>
    <Text className='text-light-200 font-bold text-sm mt-2'>
      {value || 'N/A'}
    </Text>
  </View>
)

const MovieDetails = () => {
  const {id} = useLocalSearchParams();

  const {data: movie, loading} = useFetch(() => fetchMovieDetails(id as string));
  return (
    <View className='bg-primary flex-1'>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80
        }}
      >
        <View>
          <Image
            source={{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}}
            className='w-full h-[400px] mt-8'
            resizeMode='contain'
          />
        </View>

        <View className='px-3 mb-10 relative'>
          <View className='flex-col items-start justify-center mt-5'>
            <Text className='text-white font-bold text-xl'>{movie?.title}</Text>
          </View>

          <View className='flex-row items-center gap-x-1 mt-2'>
            <Text className='text-light-200 text-sm'>
              {movie?.release_date}
            </Text>
            <Text className='text-light-200 text-sm absolute right-1'>
              {movie?.runtime} min
            </Text>
          </View>

          <View className='flex-row items-center gap-x-1 mt-2'>
            <View className='flex-row items-center gap-x-1 bg-dark-100 px-2 py-1 rounded-md'>
              <Image
                source={icons.star}
                className='size-4'
              />
              <Text className='text-white font-bold text-sm'>
                {movie?.vote_average?? 0}/10
              </Text>
            </View>
            <Text className='text-light-200 text-sm bg-dark-100 px-2 py-1 rounded-md'>
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label='Overview' value={movie?.overview} />
          <MovieInfo label='Language' value={movie?.original_language} />
          <MovieInfo label='Genres' value={movie?.genres?.map((g) => g.name).join(' - ') || 'N/A'} />
          <View className='flex flex-row justify-between w-1/2'>
            <MovieInfo label='Budget' value={`$${movie?.budget/1_000_000} million`} />
            <MovieInfo label='Revenue' value={`$${Math.round(movie?.revenue)/1_000_000}`}/>
          </View>
          <MovieInfo label='Production Company' value={movie?.production_companies.map((c) => c.name).join(' - ') || 'N/A'} />

        </View>

      </ScrollView>
      <TouchableOpacity
        className='absolute z-50 bottom-16 left-0 right-0 mx-5 bg-accent rounded-lg py-3 flex flex-row items-center justify-center'
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className='size-5 rotate-180'
          tintColor='#ffffff'
        />
        <Text className='text-white font-semibold text-base'>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails