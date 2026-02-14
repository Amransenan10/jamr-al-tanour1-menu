import { Category, MenuItem, Review } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'مقبلات وبوكسات', icon: '🍱' },
  { id: '2', name: 'فطائر', icon: '🥧' },
  { id: '3', name: 'بيتزا', icon: '🍕' },
  { id: '4', name: 'برجر', icon: '🍔' },
  { id: '5', name: 'شاورما', icon: '🌯' },
  { id: '6', name: 'وجبات', icon: '🍽️' },
  { id: '7', name: 'عصائر ومشروبات', icon: '🥤' },
  { id: '8', name: 'فطور', icon: '🍳' },
  { id: '9', name: 'بطاطس', icon: '🍟' },
];

export const INITIAL_REVIEWS: Review[] = [
  { id: 'rv1', itemId: 'b_cheese', userName: 'سارة خالد', rating: 5, comment: 'برجر الجمر عندهم لا يعلى عليه!', date: '2024-01-10' },
  { id: 'rv2', itemId: 'sh_saroukh', userName: 'فهد الرشيدي', rating: 5, comment: 'شاورما الصاروخ ممتازة جداً.', date: '2024-01-12' },
];

const SIZES_PIZZA = [{ id: 's', name: 'صغير', price: 0 }, { id: 'm', name: 'وسط', price: 7 }, { id: 'l', name: 'كبير', price: 17 }];
const EXTRA_CHEESE = [{ id: 'ex_ch', name: 'إضافة جبن', price: 2 }];
const FATAYER_IMG = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400';
const APP_IMG = 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=400';
const DRINK_IMG = 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?w=400';
const MEAL_IMG = 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400';
const BREAKFAST_IMG = 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400';
const STRIPS_IMG = 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400';

const createJuiceSizes = (p: number[]) => [
  { id: 's', name: 'صغير', price: 0 },
  { id: 'm', name: 'وسط', price: p[1] - p[0] },
  { id: 'l', name: 'كبير', price: p[2] - p[0] },
  { id: '1l', name: '1 لتر', price: p[3] - p[0] },
  { id: '1.5l', name: '1.5 لتر', price: p[4] - p[0] }
];

export const MENU_DATA: MenuItem[] = [
  // --- [1] المقبلات (9) ---
  { id: 'app_kubba', categoryId: '1', name: 'كبة (حبة)', description: 'كبة مقلية مقرمشة.', price: 2, image: APP_IMG, proteinTypes: ['لحم', 'دجاج'] },
  { id: 'app_sambo_meat', categoryId: '1', name: 'سمبوسة لحم (حبة)', description: 'سمبوسة بحشوة اللحم الشهي.', price: 1.50, image: APP_IMG },
  { id: 'app_sambo_ch', categoryId: '1', name: 'سمبوسة دجاج (حبة)', description: 'سمبوسة بحشوة الدجاج المتبل.', price: 1.50, image: APP_IMG },
  { id: 'app_sambo_cheese', categoryId: '1', name: 'سمبوسة جبن (حبة)', description: 'سمبوسة بحشوة الجبنة الغنية.', price: 1.50, image: APP_IMG },
  { id: 'app_spring', categoryId: '1', name: 'سبرنج رول (حبة)', description: 'لفائف سبرنج رول مقرمشة.', price: 2, image: APP_IMG },
  { id: 'app_malfouf', categoryId: '1', name: 'ملفوف محشي (حبة)', description: 'ملفوف محشي بخلطة الأرز اللذيذة.', price: 1.50, image: APP_IMG },
  { id: 'app_tabbouleh', categoryId: '1', name: 'صحن تبولة', description: 'سلطة تبولة طازجة بالبقدونس والبرغل.', price: 15, image: APP_IMG, sizes: [{ id: 's', name: 'صغير', price: 0 }, { id: 'm', name: 'وسط', price: 5 }, { id: 'l', name: 'كبير', price: 10 }] },
  { id: 'app_waraq_spicy', categoryId: '1', name: 'ورق عنب سبايسي (حبة)', description: 'ورق عنب محشي بخلطة حارة ومميزة.', price: 1.5, image: APP_IMG },
  { id: 'app_waraq', categoryId: '1', name: 'ورق عنب (حبة)', description: 'ورق عنب محشي بخلطة الأرز والليمون.', price: 1.5, image: APP_IMG },

  // --- [6] الوجبات المشوية والاستربس (14) ---
  { id: 'meal_strips_combo', categoryId: '6', name: 'وجبة استربس', description: 'وجبة غنية متكاملة مع خيارات الكمية.', ingredients: 'قطع دجاج، هالبينو، بطاطس، خبز، ساندوتش فاهيتا، مشروب', price: 17, image: STRIPS_IMG, sizes: [{ id: '4p', name: '4 قطع', price: 0 }, { id: '8p', name: '8 قطع', price: 6 }] },
  { id: 'meal_strips_saroukh', categoryId: '6', name: 'صاروخ استربس', description: 'ساندوتش صاروخ استربس المميز.', ingredients: 'قطع استربس، هالبينو، كاتشب، مايونيز، بطاطس', price: 12, image: STRIPS_IMG },
  { id: 'meal_strips_jumbo', categoryId: '6', name: 'جامبو استربس', description: 'ساندوتش جامبو استربس المشبع.', ingredients: 'قطع استربس، هالبينو، كاتشب، مايونيز، بطاطس', price: 13, image: STRIPS_IMG },
  { id: 'meal_fajita_sand', categoryId: '6', name: 'ساندوتش فاهيتا', description: 'ساندوتش فاهيتا دجاج كلاسيكي.', ingredients: 'دجاج فاهيتا، فلفل بارد، كاتشب، مايونيز، بطاطس', price: 6, image: STRIPS_IMG },
  { id: 'meal_fajita_saroukh', categoryId: '6', name: 'صاروخ فاهيتا', description: 'ساندوتش صاروخ فاهيتا حجم كبير.', ingredients: 'دجاج فاهيتا، فلفل بارد، كاتشب، مايونيز، بطاطس', price: 12, image: STRIPS_IMG },
  { id: 'meal_fajita_jumbo', categoryId: '6', name: 'جامبو فاهيتا', description: 'ساندوتش جامبو فاهيتا.', ingredients: 'دجاج فاهيتا، فلفل بارد، كاتشب، مايونيز، بطاطس', price: 12, image: STRIPS_IMG },
  { id: 'meal_half_grill', categoryId: '6', name: 'نصف دجاج شواية مع الأرز', description: 'نصف حبة دجاج شواية متبلة تقدم مع الأرز البسمتي.', price: 20, image: MEAL_IMG },
  { id: 'meal_full_grill', categoryId: '6', name: 'دجاجة شواية مع الأرز', description: 'دجاجة كاملة شواية متبلة تقدم مع الأرز البسمتي.', price: 38, image: MEAL_IMG },
  { id: 'meal_kebab_meat', categoryId: '6', name: 'وجبة كباب لحم', description: '3 أسياخ كباب لحم بلدي مشوي على الفحم مع الأرز أو الخبز.', price: 35, image: MEAL_IMG },
  { id: 'meal_kebab_ch', categoryId: '6', name: 'وجبة كباب دجاج', description: '3 أسياخ كباب دجاج مشوي على الفحم مع الأرز أو الخبز.', price: 32, image: MEAL_IMG },
  { id: 'meal_awsal', categoryId: '6', name: 'وجبة أوصال لحم', description: 'أوصال لحم بلدي طازج مشوي على الفحم.', price: 35, image: MEAL_IMG },
  { id: 'meal_tawook', categoryId: '6', name: 'وجبة شيش طاووق', description: 'قطع صدر دجاج متبلة ومشوية على الفحم.', price: 32, image: MEAL_IMG },
  { id: 'meal_mixed', categoryId: '6', name: 'مشكل مشوي', description: 'تشكيلة من الكباب والأوصال والريش تقدم مع المقبلات.', price: 45, image: MEAL_IMG },
  { id: 'meal_ribs', categoryId: '6', name: 'ريش غنم', description: 'ريش غنم بلدي مشوية على الفحم بخلطة التنور.', price: 55, image: MEAL_IMG },

  // --- [8] الفطور (6) ---
  { id: 'bf_foul', categoryId: '8', name: 'فول قلابة', description: 'فول مطبوخ على الطريقة التقليدية مع السمن.', price: 8, image: BREAKFAST_IMG },
  { id: 'bf_shak', categoryId: '8', name: 'شكشوكة', description: 'بيض مطبوخ مع الطماطم والبصل والبهارات.', price: 10, image: BREAKFAST_IMG },
  { id: 'bf_liver', categoryId: '8', name: 'كبدة غنم طازجة', description: 'كبدة غنم طازجة مع الخضار على الصاج.', price: 18, image: BREAKFAST_IMG },
  { id: 'bf_mugalgal', categoryId: '8', name: 'مقلقل لحم', description: 'قطع لحم صغيرة مطبوخة مع البصل والبهارات.', price: 20, image: BREAKFAST_IMG },
  { id: 'bf_lentils', categoryId: '8', name: 'عدس', description: 'عدس مطبوخ مع الكمون وزيت الزيتون.', price: 8, image: BREAKFAST_IMG },
  { id: 'bf_eggs', categoryId: '8', name: 'بيض عيون', description: 'بيض عيون مطبوخ بالزبدة.', price: 8, image: BREAKFAST_IMG },

  // --- [7] العصائر والمشروبات (12) ---
  { id: 'dr_or_mix', categoryId: '7', name: 'برتقال مشكل', description: 'عصير برتقال طازج مشكل.', price: 6, image: DRINK_IMG, sizes: createJuiceSizes([6, 8, 10, 18, 24]) },
  { id: 'dr_or_press', categoryId: '7', name: 'برتقال كبس', description: 'عصير برتقال كبس طازج 100%.', price: 7, image: DRINK_IMG, sizes: createJuiceSizes([7, 9, 11, 20, 28]) },
  { id: 'dr_or_blend', categoryId: '7', name: 'برتقال خلط', description: 'عصير برتقال خلط منعش.', price: 6, image: DRINK_IMG, sizes: createJuiceSizes([6, 8, 10, 18, 24]) },
  { id: 'dr_lemon', categoryId: '7', name: 'ليمون', description: 'عصير ليمون طازج ومنعش.', price: 5, image: DRINK_IMG, sizes: createJuiceSizes([5, 7, 9, 17, 23]) },
  { id: 'dr_lemon_mint', categoryId: '7', name: 'ليمون نعناع', description: 'عصير ليمون بالنعناع المنعش.', price: 6, image: DRINK_IMG, sizes: createJuiceSizes([6, 8, 10, 18, 24]) },
  { id: 'dr_romman', categoryId: '7', name: 'رمان', description: 'عصير رمان طازج غني بالفوائد.', price: 7, image: DRINK_IMG, sizes: createJuiceSizes([7, 9, 11, 20, 25]) },
  { id: 'dr_shamandar', categoryId: '7', name: 'شمندر', description: 'عصير شمندر صحي وطازج.', price: 6, image: DRINK_IMG, sizes: createJuiceSizes([6, 8, 10, 18, 24]) },
  { id: 'dr_mojito', categoryId: '7', name: 'ماهيتو', description: 'مشروب موهيتو بنكهات متنوعة.', price: 8, image: DRINK_IMG, sizes: [{ id: 'm', name: 'وسط', price: 0 }, { id: 'l', name: 'كبير', price: 2 }, { id: '1l', name: '1 لتر', price: 10 }, { id: '1.5l', name: '1.5 لتر', price: 16 }] },
  { id: 'dr_cola', categoryId: '7', name: 'كولا', description: 'مشروب غازي بارد.', price: 3, image: DRINK_IMG, proteinTypes: ['عادي', 'دايت', 'زيرو'] },
  { id: 'dr_kinza', categoryId: '7', name: 'كينزا', description: 'مشروب كينزا الغازي.', price: 2.5, image: DRINK_IMG },
  { id: 'dr_sprite', categoryId: '7', name: 'سبرايت', description: 'مشروب سبرايت الغازي.', price: 3, image: DRINK_IMG },
  { id: 'dr_citrus', categoryId: '7', name: 'حمضيات', description: 'مشروب حمضيات منعش.', price: 3, image: DRINK_IMG },

  // --- [3] البيتزا (15) ---
  { id: 'pz_veg', categoryId: '3', name: 'بيتزا خضار', description: 'بيتزا غنية بالخضروات الطازجة.', price: 12, image: FATAYER_IMG, sizes: SIZES_PIZZA },
  { id: 'pz_labneh', categoryId: '3', name: 'بيتزا لبنة وزعتر', description: 'بيتزا بمزيج اللبنة والزعتر المميز.', price: 13, image: FATAYER_IMG, sizes: SIZES_PIZZA },
  { id: 'pz_marg', categoryId: '3', name: 'بيتزا مارجريتا', description: 'بيتزا كلاسيكية بالصلصة والجبن.', price: 13, image: FATAYER_IMG, sizes: SIZES_PIZZA },
  { id: 'pz_ash', categoryId: '3', name: 'بيتزا عش البلبل', description: 'بيتزا باللبنة والعسل والجبن.', price: 13, image: FATAYER_IMG, sizes: SIZES_PIZZA },
  { id: 'pz_tannour', categoryId: '3', name: 'بيتزا تنور', description: 'بيتزا محضرة في فرن التنور التقليدي.', price: 13, image: FATAYER_IMG, sizes: SIZES_PIZZA },
  { id: 'pz_mix', categoryId: '3', name: 'بيتزا مشكل', description: 'بيتزا متنوعة بأفضل المكونات.', price: 13, image: FATAYER_IMG, sizes: SIZES_PIZZA },
  { id: 'pz_naqanq', categoryId: '3', name: 'بيتزا نقانق', description: 'بيتزا بقطع النقانق والجبن.', price: 13, image: FATAYER_IMG, sizes: SIZES_PIZZA },
  { id: 'pz_fajita', categoryId: '3', name: 'بيتزا فاهيتا', description: 'بيتزا فاهيتا الدجاج مع الفلفل.', price: 13, image: FATAYER_IMG, sizes: SIZES_PIZZA },
  { id: 'pz_ch_ground', categoryId: '3', name: 'بيتزا دجاج مفروم', description: 'بيتزا بالدجاج المفروم والبهارات.', price: 13, image: FATAYER_IMG, sizes: SIZES_PIZZA },
  { id: 'pz_mt_ground', categoryId: '3', name: 'بيتزا لحم مفروم', description: 'بيتزا باللحم المفروم والصلصة.', price: 13, image: FATAYER_IMG, sizes: SIZES_PIZZA },
  { id: 'pz_ch_cubes', categoryId: '3', name: 'بيتزا مكعبات دجاج', description: 'بيتزا بقطع مكعبات الدجاج المشوي.', price: 13, image: FATAYER_IMG, sizes: SIZES_PIZZA },
  { id: 'pz_mt_cubes', categoryId: '3', name: 'بيتزا مكعبات لحم', description: 'بيتزا بقطع مكعبات اللحم اللذيذة.', price: 13, image: FATAYER_IMG, sizes: SIZES_PIZZA },
  { id: 'pz_ranch', categoryId: '3', name: 'بيتزا رانش', description: 'بيتزا بصوص الرانش الشهير.', price: 13, image: FATAYER_IMG, sizes: SIZES_PIZZA },
  { id: 'pz_sea', categoryId: '3', name: 'بيتزا بحرية', description: 'بيتزا بفواكه البحر المتنوعة.', price: 13, image: FATAYER_IMG, sizes: SIZES_PIZZA },
  { id: 'pz_pepp', categoryId: '3', name: 'بيتزا ببروني', description: 'بيتزا بقطع الببروني والجبن.', price: 13, image: FATAYER_IMG, sizes: SIZES_PIZZA },

  // --- [4] البرجر (3) ---
  { id: 'b_cheese', categoryId: '4', name: 'تشيز برجر جمر', description: 'برجر مشوي على الجمر مع الجبن.', price: 12, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', proteinTypes: ['لحم', 'دجاج'], sizes: [{ id: 'reg', name: 'عادي', price: 0 }, { id: 'dbl', name: 'دبل', price: 6 }] },
  { id: 'b_classic', categoryId: '4', name: 'كلاسيك برجر', description: 'برجر كلاسيكي بمذاق رائع.', price: 11, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400', proteinTypes: ['لحم', 'دجاج'] },
  { id: 'b_arbica', categoryId: '4', name: 'أربيكا تشيز برجر', description: 'برجر أربيكا الخاص مع الجبنة.', price: 12, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400', proteinTypes: ['لحم', 'دجاج'] },

  // --- [5] الشاورما (7) ---
  { id: 'sh_small', categoryId: '5', name: 'شاورما صغير', description: 'ساندوتش شاورما بالحجم الصغير.', price: 6, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400', extras: EXTRA_CHEESE },
  { id: 'sh_dynamite', categoryId: '5', name: 'شاورما ديناميت', description: 'شاورما بصوص الديناميت الحار.', price: 6, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400', extras: EXTRA_CHEESE },
  { id: 'sh_saroukh', categoryId: '5', name: 'شاورما صاروخ', description: 'ساندوتش شاورما صاروخ كبير ومشبع.', price: 12, image: 'https://images.unsplash.com/photo-1626700051175-656fc74e0b63?w=400', extras: EXTRA_CHEESE },
  { id: 'sh_saroukh_qursan', categoryId: '5', name: 'شاورما صاروخ قرصان', description: 'شاورما صاروخ بخبز القرصان التقليدي.', price: 12, image: 'https://images.unsplash.com/photo-1626700051175-656fc74e0b63?w=400', extras: EXTRA_CHEESE },
  { id: 'sh_jumbo', categoryId: '5', name: 'شاورما جامبو', description: 'شاورما جامبو لمحبي الوجبات الكبيرة.', price: 13, image: 'https://images.unsplash.com/photo-1626700051175-656fc74e0b63?w=400', extras: EXTRA_CHEESE },
  { id: 'sh_arabi', categoryId: '5', name: 'شاورما عربي', description: 'وجبة شاورما عربي مقطعة مع المقبلات.', price: 18, image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400' },
  { id: 'sh_plate', categoryId: '5', name: 'صحن شاورما', description: 'صحن شاورما غني مع الثومية والبطاطس.', price: 18, image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400' },

  // --- [2] الفطائر (58) ---
  { id: 'f_01', categoryId: '2', name: 'لبنة', description: 'فطيرة لبنة طازجة.', price: 6, image: FATAYER_IMG },
  { id: 'f_02', categoryId: '2', name: 'لبنة عسل', description: 'فطيرة لبنة بالعسل الطبيعي.', price: 7, image: FATAYER_IMG },
  { id: 'f_03', categoryId: '2', name: 'لبنة زعتر', description: 'فطيرة لبنة بالزعتر البري.', price: 7, image: FATAYER_IMG },
  { id: 'f_04', categoryId: '2', name: 'لبنة سبانخ', description: 'فطيرة لبنة بالسبانخ الطازجة.', price: 7, image: FATAYER_IMG },
  { id: 'f_05', categoryId: '2', name: 'لبنة زيتون', description: 'فطيرة لبنة بقطع الزيتون.', price: 7, image: FATAYER_IMG },
  { id: 'f_06', categoryId: '2', name: 'لبنة جبن', description: 'فطيرة لبنة مع الجبن اللذيذ.', price: 7, image: FATAYER_IMG },
  { id: 'f_07', categoryId: '2', name: 'سبانخ', description: 'فطيرة سبانخ مطبوخة بالليمون.', price: 6, image: FATAYER_IMG },
  { id: 'f_08', categoryId: '2', name: 'سبانخ بيض', description: 'فطيرة سبانخ مع البيض.', price: 7, image: FATAYER_IMG },
  { id: 'f_09', categoryId: '2', name: 'سبانخ جبن', description: 'فطيرة سبانخ مع الجبن.', price: 7, image: FATAYER_IMG },
  { id: 'f_10', categoryId: '2', name: 'سبانخ لحم', description: 'فطيرة سبانخ مع اللحم المفروم.', price: 8, image: FATAYER_IMG },
  { id: 'f_11', categoryId: '2', name: 'دجاج', description: 'فطيرة بحشوة الدجاج المتبل.', price: 7, image: FATAYER_IMG },
  { id: 'f_12', categoryId: '2', name: 'عكاوي', description: 'فطيرة جبن عكاوي أصلي.', price: 7, image: FATAYER_IMG },
  { id: 'f_13', categoryId: '2', name: 'حلوم', description: 'فطيرة جبن حلوم مشوي.', price: 7, image: FATAYER_IMG },
  { id: 'f_14', categoryId: '2', name: 'قشقوان', description: 'فطيرة جبن قشقوان ذائبة.', price: 7, image: FATAYER_IMG },
  { id: 'f_15', categoryId: '2', name: 'مالح', description: 'فطيرة جبن مالح مميزة.', price: 6, image: FATAYER_IMG },
  { id: 'f_16', categoryId: '2', name: 'جبن بيض', description: 'فطيرة جبن مع بيض طازج.', price: 7, image: FATAYER_IMG },
  { id: 'f_17', categoryId: '2', name: 'جبن زيتون', description: 'فطيرة جبن بالزيتون.', price: 7, image: FATAYER_IMG },
  { id: 'f_18', categoryId: '2', name: 'جبن زعتر', description: 'فطيرة جبن بالزعتر.', price: 7, image: FATAYER_IMG },
  { id: 'f_19', categoryId: '2', name: 'زعتر', description: 'فطيرة زعتر بالزيت.', price: 6, image: FATAYER_IMG },
  { id: 'f_20', categoryId: '2', name: 'مناقيش زعتر', description: 'منقوشة زعتر كبيرة.', price: 9, image: FATAYER_IMG },
  { id: 'f_21', categoryId: '2', name: 'شيدر', description: 'فطيرة جبن شيدر.', price: 6, image: FATAYER_IMG },
  { id: 'f_22', categoryId: '2', name: 'قشطة عسل', description: 'فطيرة قشطة بالعسل الصافي.', price: 7, image: FATAYER_IMG },
  { id: 'f_23', categoryId: '2', name: 'سائل فاهيتا', description: 'فطيرة بحشوة فاهيتا وجبن سائل.', price: 8, image: FATAYER_IMG },
  { id: 'f_24', categoryId: '2', name: 'سائل عسل', description: 'فطيرة جبن سائل بالعسل.', price: 7, image: FATAYER_IMG },
  { id: 'f_25', categoryId: '2', name: 'سائل بيض', description: 'فطيرة جبن سائل بالبيض.', price: 7, image: FATAYER_IMG },
  { id: 'f_26', categoryId: '2', name: 'شيدر عسل', description: 'فطيرة جبن شيدر بالعسل.', price: 7, image: FATAYER_IMG },
  { id: 'f_27', categoryId: '2', name: 'بطاطس سائل', description: 'فطيرة بطاطس بالجبن السائل.', price: 7, image: FATAYER_IMG },
  { id: 'f_28', categoryId: '2', name: 'دجاج سائل', description: 'فطيرة دجاج بالجبن السائل.', price: 8, image: FATAYER_IMG },
  { id: 'f_29', categoryId: '2', name: 'لحم سائل', description: 'فطيرة لحم بالجبن السائل.', price: 8, image: FATAYER_IMG },
  { id: 'f_30', categoryId: '2', name: 'محمرة سائل', description: 'فطيرة محمرة بالجبن السائل.', price: 11, image: FATAYER_IMG },
  { id: 'f_31', categoryId: '2', name: 'دجاج شيدر', description: 'فطيرة دجاج بجبن الشيدر.', price: 8, image: FATAYER_IMG },
  { id: 'f_32', categoryId: '2', name: 'لحم', description: 'فطيرة بحشوة اللحم الشهية.', price: 8, image: FATAYER_IMG },
  { id: 'f_33', categoryId: '2', name: 'لحم شيدر', description: 'فطيرة لحم بجبن الشيدر.', price: 8, image: FATAYER_IMG },
  { id: 'f_34', categoryId: '2', name: 'تونا', description: 'فطيرة تونا بالخلطة الخاصة.', price: 7, image: FATAYER_IMG },
  { id: 'f_35', categoryId: '2', name: 'تونا سائل', description: 'فطيرة تونا بالجبن السائل.', price: 7, image: FATAYER_IMG },
  { id: 'f_36', categoryId: '2', name: 'نقانق', description: 'فطيرة نقانق.', price: 7, image: FATAYER_IMG },
  { id: 'f_37', categoryId: '2', name: 'نقانق جبن', description: 'فطيرة نقانق مع الجبن.', price: 7, image: FATAYER_IMG },
  { id: 'f_38', categoryId: '2', name: 'نقانق بيض', description: 'فطيرة نقانق مع البيض.', price: 7, image: FATAYER_IMG },
  { id: 'f_39', categoryId: '2', name: 'نوتيلا', description: 'فطيرة شوكولاتة نوتيلا.', price: 7, image: FATAYER_IMG },
  { id: 'f_40', categoryId: '2', name: 'سائل', description: 'فطيرة جبن سائل.', price: 6, image: FATAYER_IMG },
  { id: 'f_41', categoryId: '2', name: 'سائل زعتر', description: 'فطيرة جبن سائل بالزعتر.', price: 7, image: FATAYER_IMG },
  { id: 'f_42', categoryId: '2', name: 'بطاطس', description: 'فطيرة بطاطس مهروسة.', price: 6, image: FATAYER_IMG },
  { id: 'f_43', categoryId: '2', name: 'محمرة', description: 'فطيرة محمرة حارة ولذيذة.', price: 9, image: FATAYER_IMG },
  { id: 'f_44', categoryId: '2', name: 'بيض', description: 'فطيرة بيض مقلي.', price: 6, image: FATAYER_IMG },
  { id: 'f_45', categoryId: '2', name: 'فطيرة شاورما', description: 'فطيرة محشوة بشاورما الدجاج.', price: 9, image: FATAYER_IMG },
  { id: 'f_46', categoryId: '2', name: 'فطيرة فلافل', description: 'فطيرة محشوة بالفلافل الطازجة.', price: 8, image: FATAYER_IMG },
  { id: 'f_47', categoryId: '2', name: 'عرايس لبنة', description: 'عرايس لبنة مقرمشة.', price: 10, image: FATAYER_IMG },
  { id: 'f_48', categoryId: '2', name: 'عرايس سائل', description: 'عرايس جبن سائل مقرمشة.', price: 10, image: FATAYER_IMG },
  { id: 'f_49', categoryId: '2', name: 'عرايس شيدر', description: 'عرايس جبن شيدر مقرمشة.', price: 10, image: FATAYER_IMG },
  { id: 'f_50', categoryId: '2', name: 'عرايس دجاج', description: 'عرايس محشوة بالدجاج المتبل.', price: 13, image: FATAYER_IMG },
  { id: 'f_51', categoryId: '2', name: 'عرايس لحم', description: 'عرايس محشوة باللحم المشوي.', price: 13, image: FATAYER_IMG },
  { id: 'f_52', categoryId: '2', name: 'عرايس قشقوان', description: 'عرايس جبن قشقوان مقرمشة.', price: 13, image: FATAYER_IMG },
  { id: 'f_53', categoryId: '2', name: 'عرايس سبانخ', description: 'عرايس محشوة بالسبانخ.', price: 10, image: FATAYER_IMG },
  { id: 'f_54', categoryId: '2', name: 'موزاريلا', description: 'فطيرة جبن موزاريلا ذائبة.', price: 7, image: FATAYER_IMG },
  { id: 'f_55', categoryId: '2', name: 'فطيرة فلافل بيض', description: 'فطيرة فلافل مع بيض.', price: 9, image: FATAYER_IMG },
  { id: 'f_56', categoryId: '2', name: 'اجبان مشكلة', description: 'فطيرة بتشكيلة من الأجبان الرائعة.', price: 9, image: FATAYER_IMG },
  { id: 'f_58', categoryId: '2', name: 'جبنة فيتا', description: 'فطيرة جبنة فيتا طازجة.', price: 6, image: FATAYER_IMG },

  // --- [9] البطاطس (1) ---
  { id: 'bt_fr', categoryId: '9', name: 'صحن بطاطس', description: 'بطاطس مقلية ذهبية ومقرمشة.', price: 5, image: 'https://images.unsplash.com/photo-1573016605834-59b14d72ea25?w=400', sizes: [{ id: 's', name: 'صغير', price: 0 }, { id: 'm', name: 'وسط', price: 3 }, { id: 'l', name: 'كبير', price: 7 }] },
];

export const MENU_ITEMS = MENU_DATA;
